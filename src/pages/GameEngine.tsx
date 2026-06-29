import { useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import Header from '../components/Header';
import EditorPanel from '../components/EditorPanel';
import PixiMaze from '../components/PixiMaze';
import LevelCompleteModal from '../components/LevelCompleteModal';
import { useGameStore } from '../game/store';
import { levels } from '../game/levels';

export default function GameEngine() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { startGame, startCustomGame } = useGameStore();

  useEffect(() => {
    if (id === 'custom') {
      const data = searchParams.get('data');
      if (data) {
        try {
          const parsed = JSON.parse(atob(decodeURIComponent(data)));
          startCustomGame({ ...parsed, id: 'custom' });
        } catch (e) {
          navigate('/');
        }
      } else {
        navigate('/');
      }
    } else if (id) {
      const levelNum = parseInt(id, 10);
      if (!isNaN(levelNum) && levelNum >= 1 && levelNum <= levels.length) {
        startGame(levelNum - 1);
      } else {
        navigate('/');
      }
    }
  }, [id, navigate, startGame, startCustomGame, searchParams]);

  const tickTime = useGameStore(s => s.tickTime);
  useEffect(() => {
    const timer = setInterval(tickTime, 1000);
    return () => clearInterval(timer);
  }, [tickTime]);

  const isPlaying = useGameStore(s => s.gameState === 'playing');
  if (!isPlaying) return null;

  return (
    <div className="h-full w-full flex flex-col">
      <Header />
      <main className="flex-1 flex flex-col md:flex-row relative h-full min-h-0 z-10">
        {/* CRT Monitor (Maze) */}
        <div className="h-[40%] md:h-auto md:flex-1 relative min-h-0 flex items-center justify-center p-2 md:p-4 crt-screen">
          <div className="absolute inset-2 md:inset-4 rounded-2xl border border-white/5 overflow-hidden bg-[#070714]">
            <div className="absolute top-0 left-0 right-0 h-6 bg-[#0a0a1a] border-b border-white/5 flex items-center px-3 gap-2 z-10">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
              <span className="text-[8px] font-mono text-slate-600 ml-2">css-maze — maze.bin</span>
            </div>
            <div className="absolute inset-0 mt-6">
              <PixiMaze />
            </div>
          </div>
        </div>

        {/* Terminal (Editor) */}
        <div className="h-[60%] md:h-full w-full md:w-[420px] lg:w-[520px] border-t md:border-t-0 md:border-l border-white/5 shrink-0 z-20 flex flex-col bg-[#0a0a1a]/95 backdrop-blur-md">
          <EditorPanel />
        </div>
      </main>
      <LevelCompleteModal />
    </div>
  );
}
