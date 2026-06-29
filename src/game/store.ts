import { create } from 'zustand';
import { levels, parseGrid, Level } from './levels';

type Position = { x: number; y: number; r: number; s: number };

interface GameState {
  gameState: 'menu' | 'playing';
  unlockedLevel: number;
  currentLevelIndex: number;
  currentLevelData: Level;
  isCustomLevel: boolean;
  playerPos: Position;
  history: Position[];
  score: number;
  combo: number;
  steps: number;
  code: string;
  isLevelComplete: boolean;
  timeElapsed: number;
  bestTimes: Record<number, number>;
  isMilestoneModalOpen: boolean;
  isGuidebookOpen: boolean;
  language: 'en' | 'id';
  
  setCode: (code: string) => void;
  executeMove: (dx: number, dy: number, dr: number, ds: number) => boolean;
  undo: () => void;
  nextLevel: () => void;
  resetLevel: () => void;
  tickTime: () => void;
  startGame: (levelIndex: number) => void;
  startCustomGame: (levelData: Level) => void;
  goToMenu: () => void;
  toggleMilestoneModal: (open: boolean) => void;
  toggleGuidebook: (open: boolean) => void;
  setLanguage: (lang: 'en' | 'id') => void;
}

export const useGameStore = create<GameState>((set, get) => {
  // Try to load unlocked level from localStorage
  const savedUnlocked = parseInt(localStorage.getItem('unlockedLevel') || '0', 10);
  const initialUnlocked = isNaN(savedUnlocked) ? 0 : savedUnlocked;
  
  let initialBestTimes: Record<number, number> = {};
  try {
    const savedTimes = localStorage.getItem('bestTimes');
    if (savedTimes) initialBestTimes = JSON.parse(savedTimes);
  } catch (e) {}

  const initLevelWithData = (lvl: Level) => {
    const { start } = parseGrid(lvl.grid);
    return {
      playerPos: { x: start.x, y: start.y, r: 0, s: 1 },
      history: [],
      steps: 0,
      code: `.player {\n  /* Tulis CSS kamu di sini */\n  \n}`,
      isLevelComplete: false,
    };
  };

  return {
    gameState: 'menu',
    unlockedLevel: initialUnlocked,
    currentLevelIndex: 0,
    currentLevelData: levels[0],
    isCustomLevel: false,
    ...initLevelWithData(levels[0]),
    score: 0,
    combo: 0,
    timeElapsed: 0,
    bestTimes: initialBestTimes,
    isMilestoneModalOpen: false,
    isGuidebookOpen: false,
    language: 'en',

    setCode: (code) => set({ code }),
    toggleMilestoneModal: (open) => set({ isMilestoneModalOpen: open }),
    toggleGuidebook: (open) => set({ isGuidebookOpen: open }),
    setLanguage: (lang) => set({ language: lang }),
    
    executeMove: (dx, dy, dr, ds) => {
      const state = get();
      const lvl = state.currentLevelData;
      const { walls, end } = parseGrid(lvl.grid);
      
      const newX = Math.round(state.playerPos.x + dx);
      const newY = Math.round(state.playerPos.y + dy);
      
      // Path and bound check (Continuous Collision Detection)
      let hitWall = false;
      const stepCount = Math.max(Math.abs(newX - state.playerPos.x), Math.abs(newY - state.playerPos.y));
      
      if (stepCount > 0) {
        for (let i = 1; i <= stepCount; i++) {
          const checkX = Math.round(state.playerPos.x + ((newX - state.playerPos.x) * i) / stepCount);
          const checkY = Math.round(state.playerPos.y + ((newY - state.playerPos.y) * i) / stepCount);
          
          if (checkX < 0 || checkX >= lvl.size || checkY < 0 || checkY >= lvl.size || walls.has(`${checkX},${checkY}`)) {
            hitWall = true;
            break;
          }
        }
      } else {
         if (newX < 0 || newX >= lvl.size || newY < 0 || newY >= lvl.size || walls.has(`${newX},${newY}`)) {
           hitWall = true;
         }
      }
      
      if (hitWall) {
        set({ combo: 0 }); // Reset combo on hit
        return false; // Hit wall
      }

      // Valid move
      const newPos = { x: newX, y: newY, r: state.playerPos.r + dr, s: ds };
      const isWin = newX === end.x && newY === end.y;
      
      let newUnlocked = state.unlockedLevel;
      if (isWin && !state.isCustomLevel && state.currentLevelIndex >= state.unlockedLevel) {
        newUnlocked = state.currentLevelIndex + 1;
        localStorage.setItem('unlockedLevel', newUnlocked.toString());
      }
      
      let newBestTimes = { ...state.bestTimes };
      if (isWin && !state.isCustomLevel) {
        const currentBest = newBestTimes[state.currentLevelIndex];
        if (currentBest === undefined || state.timeElapsed < currentBest) {
          newBestTimes[state.currentLevelIndex] = state.timeElapsed;
          localStorage.setItem('bestTimes', JSON.stringify(newBestTimes));
        }
      }
      
      set((s) => ({
        playerPos: newPos,
        history: [...s.history, s.playerPos],
        steps: s.steps + 1,
        score: s.score + 10 + (s.combo * 5),
        combo: s.combo + 1,
        isLevelComplete: isWin,
        unlockedLevel: newUnlocked,
        bestTimes: newBestTimes
      }));
      
      return true;
    },

    undo: () => set((state) => {
      if (state.history.length === 0) return state;
      const prev = state.history[state.history.length - 1];
      return {
        playerPos: prev,
        history: state.history.slice(0, -1),
        steps: Math.max(0, state.steps - 1)
      };
    }),

    nextLevel: () => set((state) => {
      if (state.isCustomLevel) return state; // No next level for custom
      const nextIdx = Math.min(levels.length - 1, state.currentLevelIndex + 1);
      return {
        currentLevelIndex: nextIdx,
        currentLevelData: levels[nextIdx],
        ...initLevelWithData(levels[nextIdx]),
        combo: 0,
      };
    }),

    resetLevel: () => set((state) => ({
      ...initLevelWithData(state.currentLevelData),
      combo: 0,
    })),

    tickTime: () => set((state) => {
      if (state.gameState !== 'playing' || state.isLevelComplete) return state;
      return { timeElapsed: state.timeElapsed + 1 };
    }),

    startGame: (levelIndex) => set((state) => ({
      gameState: 'playing',
      currentLevelIndex: levelIndex,
      currentLevelData: levels[levelIndex],
      isCustomLevel: false,
      ...initLevelWithData(levels[levelIndex]),
      combo: 0,
      timeElapsed: 0,
    })),

    startCustomGame: (levelData) => set((state) => ({
      gameState: 'playing',
      currentLevelIndex: -1,
      currentLevelData: levelData,
      isCustomLevel: true,
      ...initLevelWithData(levelData),
      combo: 0,
      timeElapsed: 0,
    })),

    goToMenu: () => set({ gameState: 'menu' })
  };
});

