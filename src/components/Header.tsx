import { useGameStore } from '../game/store';
import { levels, getDifficultyLabel } from '../game/levels';
import { formatTime } from '../lib/format';
import { ChevronLeft, Zap, Trophy } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const { currentLevelData, score, steps, timeElapsed, isCustomLevel } = useGameStore();
  const lvl = currentLevelData;
  const navigate = useNavigate();
  const diff = lvl.difficulty ? getDifficultyLabel(lvl.difficulty) : null;

  return (
    <header className="h-12 md:h-14 flex items-center justify-between px-3 md:px-5 bg-[#0a0a1a] border-b border-white/5 text-white z-10 shrink-0">
      <div className="flex items-center gap-2 md:gap-3">
        <button
          onClick={() => navigate('/levels')}
          className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 transition-colors flex items-center justify-center text-slate-500 hover:text-white"
          title="Back"
        >
          <ChevronLeft size={16} />
        </button>
        <div className="flex items-center gap-2">
          <div
            className="w-7 h-7 md:w-8 md:h-8 rounded-lg flex items-center justify-center font-bold font-pixel text-[10px] md:text-xs border"
            style={{
              background: diff ? `${diff.color}15` : 'rgba(0,229,255,0.1)',
              borderColor: diff ? `${diff.color}30` : 'rgba(0,229,255,0.2)',
              color: diff?.color || '#00e5ff',
            }}
          >
            {lvl.id}
          </div>
          <div>
            <h1 className="font-bold text-xs md:text-sm leading-tight text-white flex items-center gap-1.5">
              {lvl.targetCss || `Level ${lvl.id}`}
              {diff && (
                <span
                  className="text-[7px] md:text-[8px] font-mono px-1.5 py-0.5 rounded uppercase tracking-widest"
                  style={{ background: `${diff.color}15`, color: diff.color, border: `1px solid ${diff.color}20` }}
                >
                  {diff.label}
                </span>
              )}
            </h1>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 md:gap-5 font-mono text-[10px] md:text-xs">
        <div className="flex items-center gap-1.5">
          <Trophy size={12} className="text-yellow-500" />
          <span className="font-bold text-yellow-400">{score}</span>
        </div>
        <div className="w-px h-4 bg-white/5" />
        <div className="flex items-center gap-1">
          <Zap size={12} className="text-slate-500" />
          <span className="text-slate-300">{steps}<span className="text-slate-600">/{lvl.minSteps}</span></span>
        </div>
        <div className="w-px h-4 bg-white/5" />
        <div className="text-slate-400">
          <span className="text-xs">{formatTime(timeElapsed)}</span>
        </div>
      </div>
    </header>
  );
}
