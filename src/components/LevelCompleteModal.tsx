import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../game/store';
import { levels, getDifficultyLabel } from '../game/levels';
import { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Trophy, Zap, Timer, Star } from 'lucide-react';

export default function LevelCompleteModal() {
  const { isLevelComplete, currentLevelIndex, score, steps, currentLevelData, isCustomLevel } = useGameStore();
  const lvl = currentLevelData;
  const navigate = useNavigate();
  const [showContent, setShowContent] = useState(false);
  const diff = lvl.difficulty ? getDifficultyLabel(lvl.difficulty) : null;

  useEffect(() => {
    if (isLevelComplete) {
      setShowContent(false);
      const timer = setTimeout(() => setShowContent(true), 600);
      confetti({
        particleCount: 100,
        spread: 60,
        origin: { y: 0.6 },
        colors: diff ? [diff.color, '#00e5ff', '#7c3aed', '#fff'] : ['#00e5ff', '#7c3aed', '#ff6b9d'],
      });
      return () => clearTimeout(timer);
    }
  }, [isLevelComplete]);

  const perfect = steps <= lvl.minSteps;

  return (
    <AnimatePresence>
      {isLevelComplete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85">
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative rounded-2xl border max-w-sm w-full text-center overflow-hidden"
            style={{
              background: '#0f0f20',
              borderColor: diff ? `${diff.color}30` : 'rgba(0,229,255,0.3)',
              boxShadow: diff ? `0 0 60px ${diff.color}15, 0 0 120px ${diff.color}08` : '0 0 60px rgba(0,229,255,0.1)',
            }}
          >
            {/* Top accent line */}
            <div className="h-1 w-full" style={{ background: diff?.color || '#00e5ff' }} />

            <AnimatePresence>
              {showContent && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-6 md:p-8"
                >
                  {/* Status */}
                  <div className="mb-5">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-[10px] font-mono uppercase tracking-widest mb-3"
                      style={{ borderColor: `${diff?.color}30` || '#00e5ff30', color: diff?.color || '#00e5ff', background: `${diff?.color}10` || '#00e5ff10' }}
                    >
                      <Trophy size={12} />
                      LEVEL CLEAR
                    </div>
                    <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">
                      {lvl.targetCss || 'Complete!'}
                    </h2>
                    <p className="text-xs font-mono text-slate-500 mt-1">
                      {diff?.label || ''} · Level {lvl.id}
                    </p>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-2 mb-6">
                    <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                      <Trophy size={14} className="mx-auto mb-1 text-yellow-500" />
                      <div className="text-lg font-bold text-white font-mono">{score}</div>
                      <div className="text-[8px] text-slate-500 font-mono uppercase tracking-widest">Score</div>
                    </div>
                    <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                      <Zap size={14} className="mx-auto mb-1" style={{ color: perfect ? '#00e5ff' : '#f43f5e' }} />
                      <div className="text-lg font-bold text-white font-mono">{steps}<span className="text-xs text-slate-500">/{lvl.minSteps}</span></div>
                      <div className="text-[8px] text-slate-500 font-mono uppercase tracking-widest">Steps</div>
                    </div>
                    <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                      <Star size={14} className="mx-auto mb-1" style={{ color: perfect ? '#fbbf24' : '#64748b' }} />
                      <div className="text-lg font-bold font-mono" style={{ color: perfect ? '#fbbf24' : '#64748b' }}>
                        {perfect ? 'S' : 'A'}
                      </div>
                      <div className="text-[8px] text-slate-500 font-mono uppercase tracking-widest">Rank</div>
                    </div>
                  </div>

                  {/* Next button */}
                  <button
                    onClick={() => {
                      if (isCustomLevel) { navigate('/'); }
                      else if (currentLevelIndex < levels.length - 1) { navigate(`/level/${levels[currentLevelIndex + 1].id}`); }
                      else { navigate('/levels'); }
                    }}
                    className="w-full py-3 rounded-xl font-bold text-xs md:text-sm flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]"
                    style={{
                      background: diff?.color || '#00e5ff',
                      color: '#070714',
                    }}
                  >
                    {isCustomLevel ? 'BACK TO MENU' : (currentLevelIndex < levels.length - 1 ? <>NEXT LEVEL <ChevronRight size={16} /></> : 'VIEW ALL LEVELS')}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
