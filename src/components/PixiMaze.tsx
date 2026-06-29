import { useEffect, useRef } from 'react';
import * as PIXI from 'pixi.js';
import { useGameStore } from '../game/store';
import { levels, parseGrid, getDifficultyLabel } from '../game/levels';

const TIER_COLORS: Record<string, number> = {
  EZ: 0x00e5ff, MID: 0x7c3aed, HARD: 0xf43f5e, EXPERT: 0xfbbf24, ADVANCE: 0xffffff,
};

export default function PixiMaze() {
  const containerRef = useRef<HTMLDivElement>(null);
  const appRef = useRef<PIXI.Application | null>(null);
  const playerRef = useRef<PIXI.Graphics | null>(null);
  const { currentLevelData, playerPos } = useGameStore();
  const lvl = currentLevelData;
  const diff = lvl.difficulty || 'EZ';
  const tierColor = TIER_COLORS[diff] || 0x00e5ff;

  useEffect(() => {
    let isMounted = true;
    let app: PIXI.Application | null = null;
    let initialized = false;

    const init = async () => {
      app = new PIXI.Application();
      await app.init({
        width: 800, height: 800, backgroundAlpha: 0,
        antialias: false, resolution: Math.min(window.devicePixelRatio || 1, 2),
      });
      initialized = true;
      if (!isMounted) { app.destroy(true, { children: true }); return; }
      appRef.current = app;

      if (containerRef.current) {
        containerRef.current.innerHTML = '';
        app.canvas.style.width = '100%';
        app.canvas.style.height = '100%';
        app.canvas.style.maxWidth = '800px';
        app.canvas.style.maxHeight = '800px';
        app.canvas.style.objectFit = 'contain';
        containerRef.current.appendChild(app.canvas);
      }

      const { start, end, walls } = parseGrid(lvl.grid);
      const cellSize = 800 / lvl.size;

      // Grid background
      const bg = new PIXI.Graphics();
      bg.rect(0, 0, 800, 800);
      bg.fill(0x070714);
      app.stage.addChild(bg);

      // Walls
      const wallLayer = new PIXI.Container();
      app.stage.addChild(wallLayer);

      for (let y = 0; y < lvl.size; y++) {
        for (let x = 0; x < lvl.size; x++) {
          const cell = new PIXI.Graphics();
          cell.rect(x * cellSize, y * cellSize, cellSize, cellSize);
          if (walls.has(`${x},${y}`)) {
            cell.fill({ color: tierColor, alpha: 0.08 });
            cell.stroke({ width: 1, color: tierColor, alpha: 0.15 });
          } else {
            cell.fill({ color: 0x0a0a1a, alpha: 0.3 });
            cell.stroke({ width: 1, color: 0x1a1a2e, alpha: 0.3 });
          }
          wallLayer.addChild(cell);
        }
      }

      // Grid lines (subtle)
      const gridLines = new PIXI.Graphics();
      gridLines.stroke({ width: 0.5, color: 0xffffff, alpha: 0.03 });
      for (let i = 0; i <= lvl.size; i++) {
        const pos = i * cellSize;
        gridLines.moveTo(pos, 0); gridLines.lineTo(pos, 800);
        gridLines.moveTo(0, pos); gridLines.lineTo(800, pos);
      }
      app.stage.addChild(gridLines);

      // Exit star
      const finish = new PIXI.Graphics();
      finish.star(end.x * cellSize + cellSize / 2, end.y * cellSize + cellSize / 2, 5, cellSize * 0.3, cellSize * 0.12);
      finish.fill(tierColor);
      finish.alpha = 0.6;
      app.stage.addChild(finish);

      // Player
      const player = new PIXI.Graphics();
      player.circle(0, 0, cellSize * 0.32);
      player.fill(tierColor);
      const glow = new PIXI.Graphics();
      glow.circle(0, 0, cellSize * 0.45);
      glow.fill(tierColor);
      glow.alpha = 0.15;
      player.addChild(glow);
      player.x = playerPos.x * cellSize + cellSize / 2;
      player.y = playerPos.y * cellSize + cellSize / 2;
      app.stage.addChild(player);
      playerRef.current = player;

      // Ambient particles
      const particles: { sprite: PIXI.Graphics; vx: number; vy: number }[] = [];
      const particleLayer = new PIXI.Container();
      app.stage.addChild(particleLayer);

      const numP = Math.min(20, lvl.size * 2);
      for (let i = 0; i < numP; i++) {
        const p = new PIXI.Graphics();
        p.circle(0, 0, Math.random() * 1.5 + 0.5);
        p.fill({ color: tierColor, alpha: Math.random() * 0.2 + 0.05 });
        p.x = Math.random() * 800; p.y = Math.random() * 800;
        particleLayer.addChild(p);
        particles.push({ sprite: p, vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3 });
      }

      let prevPx = playerPos.x * cellSize + cellSize / 2;
      let prevPy = playerPos.y * cellSize + cellSize / 2;

      app.ticker.add((ticker) => {
        if (!playerRef.current) return;
        const state = useGameStore.getState();
        const targetX = state.playerPos.x * cellSize + cellSize / 2;
        const targetY = state.playerPos.y * cellSize + cellSize / 2;
        const targetR = state.playerPos.r * (Math.PI / 180);
        const targetS = state.playerPos.s;

        playerRef.current.x += (targetX - playerRef.current.x) * 0.12 * ticker.deltaTime;
        playerRef.current.y += (targetY - playerRef.current.y) * 0.12 * ticker.deltaTime;
        playerRef.current.rotation += (targetR - playerRef.current.rotation) * 0.12 * ticker.deltaTime;
        playerRef.current.scale.x += (targetS - playerRef.current.scale.x) * 0.12 * ticker.deltaTime;
        playerRef.current.scale.y += (targetS - playerRef.current.scale.y) * 0.12 * ticker.deltaTime;

        const dx = playerRef.current.x - prevPx;
        const dy = playerRef.current.y - prevPy;
        prevPx = playerRef.current.x;
        prevPy = playerRef.current.y;

        for (const p of particles) {
          p.sprite.x += p.vx * ticker.deltaTime;
          p.sprite.y += p.vy * ticker.deltaTime;
          if (dx !== 0 || dy !== 0) {
            const dist = Math.hypot(p.sprite.x - playerRef.current.x, p.sprite.y - playerRef.current.y);
            if (dist < 150) { const force = (150 - dist) / 150; p.sprite.x += dx * force * 0.3; p.sprite.y += dy * force * 0.3; }
          }
          if (p.sprite.x < -10) p.sprite.x = 810; else if (p.sprite.x > 810) p.sprite.x = -10;
          if (p.sprite.y < -10) p.sprite.y = 810; else if (p.sprite.y > 810) p.sprite.y = -10;
        }
      });
    };

    init();
    return () => { isMounted = false; if (app && initialized) app.destroy(true, { children: true }); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLevelData]);

  return (
    <div className="absolute inset-0 flex items-center justify-center p-1">
      <div ref={containerRef} className="w-full h-full flex items-center justify-center overflow-hidden" />
    </div>
  );
}
