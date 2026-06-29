import { motion } from 'framer-motion';
import { Lock, Play, CheckCircle, X, Timer, ChevronRight } from 'lucide-react';
import { useGameStore } from '../game/store';
import { levels, getDifficultyLabel, Difficulty } from '../game/levels';
import { formatTime } from '../lib/format';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const TIERS: { diff: Difficulty; icon: string; from: number; to: number }[] = [
  { diff: 'EZ', icon: '●', from: 0, to: 29 },
  { diff: 'MID', icon: '●●', from: 30, to: 59 },
  { diff: 'HARD', icon: '●●●', from: 60, to: 89 },
  { diff: 'EXPERT', icon: '✦', from: 90, to: 119 },
  { diff: 'ADVANCE', icon: '★', from: 120, to: 149 },
];

const TIER_COLORS: Record<Difficulty, string> = {
  EZ: '#00e5ff', MID: '#7c3aed', HARD: '#f43f5e', EXPERT: '#fbbf24', ADVANCE: '#fff',
};

export default function LevelsPage() {
  const { unlockedLevel, bestTimes } = useGameStore();
  const navigate = useNavigate();
  const [activeTier, setActiveTier] = useState<Difficulty | null>(null);

  const filtered = activeTier
    ? levels.filter((_, i) => {
        const t = TIERS.find(t => i >= t.from && i <= t.to);
        return t?.diff === activeTier;
      })
    : levels;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex flex-col bg-black/95"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 md:px-8 py-3 md:py-4 border-b border-white/5 shrink-0">
        <div>
          <h2 className="text-lg md:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <span className="text-[#00e5ff] font-pixel text-xs md:text-sm">LVL</span>
            LEVEL MILESTONES
          </h2>
          <p className="text-[10px] md:text-xs font-mono text-slate-500">
            {unlockedLevel + 1} / {levels.length} — {Math.round(((unlockedLevel + 1) / levels.length) * 100)}% COMPLETE
          </p>
        </div>
        <button onClick={() => navigate('/')} className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white transition-colors border border-white/10">
          <X size={18} />
        </button>
      </div>

      {/* Tier Tabs */}
      <div className="flex gap-1 px-4 md:px-8 py-2 border-b border-white/5 bg-[#0a0a1a] shrink-0 overflow-x-auto custom-scrollbar">
        <button
          onClick={() => setActiveTier(null)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold font-mono transition-all whitespace-nowrap ${
            !activeTier ? 'bg-white/10 text-white border border-white/20' : 'text-slate-500 hover:text-white hover:bg-white/5 border border-transparent'
          }`}
        >
          ALL
        </button>
        {TIERS.map(t => {
          const label = getDifficultyLabel(t.diff);
          const active = activeTier === t.diff;
          return (
            <button
              key={t.diff}
              onClick={() => setActiveTier(active ? null : t.diff)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold font-mono transition-all whitespace-nowrap border ${
                active
                  ? 'text-white border-white/20'
                  : 'text-slate-500 hover:text-white hover:bg-white/5 border-transparent'
              }`}
              style={active ? { background: `${TIER_COLORS[t.diff]}15`, borderColor: `${TIER_COLORS[t.diff]}30` } : {}}
            >
              <span style={{ color: TIER_COLORS[t.diff] }}>{t.icon}</span>
              {label.label}
            </button>
          );
        })}
      </div>

      {/* Progress bar */}
      <div className="h-0.5 bg-white/5 shrink-0">
        <div className="h-full bg-gradient-to-r from-[#00e5ff] via-[#7c3aed] via-[#f43f5e] via-[#fbbf24] to-white transition-all duration-500" style={{ width: `${Math.min(100, ((unlockedLevel + 1) / levels.length) * 100)}%` }} />
      </div>

      {/* Level Grid */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-4 md:p-8">
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-2 md:gap-3">
          {filtered.map((lvl, idx) => {
            const realIndex = levels.indexOf(lvl);
            const isUnlocked = realIndex <= unlockedLevel;
            const hasBestTime = bestTimes[realIndex] !== undefined;
            const tier = TIERS.find(t => realIndex >= t.from && realIndex <= t.to);
            const tierColor = tier ? TIER_COLORS[tier.diff] : '#00e5ff';

            return (
              <motion.button
                key={lvl.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: (idx % 20) * 0.015 }}
                disabled={!isUnlocked}
                onClick={() => navigate(`/level/${lvl.id}`)}
                className={`relative rounded-xl flex flex-col items-center justify-center transition-all duration-300 min-h-[90px] md:min-h-[110px] border ${
                  isUnlocked
                    ? 'hover:scale-105 cursor-pointer bg-[#0f0f20] hover:bg-[#151530] shadow-lg'
                    : 'opacity-25 cursor-not-allowed bg-[#0a0a1a]'
                }`}
                style={{
                  borderColor: isUnlocked ? `${tierColor}20` : 'rgba(255,255,255,0.03)',
                  boxShadow: isUnlocked ? `0 0 15px ${tierColor}08` : 'none',
                }}
              >
                {/* Difficulty indicator line */}
                {isUnlocked && (
                  <div className="absolute top-0 left-2 right-2 h-0.5 rounded-full" style={{ background: tierColor, opacity: 0.5 }} />
                )}

                <span
                  className={`text-xl md:text-2xl font-bold font-mono transition-colors ${
                    isUnlocked ? 'text-white' : 'text-slate-700'
                  }`}
                  style={isUnlocked ? { textShadow: `0 0 20px ${tierColor}20` } : {}}
                >
                  {lvl.id}
                </span>

                {isUnlocked && (
                  <span className="text-[7px] md:text-[8px] font-mono mt-0.5 uppercase tracking-widest" style={{ color: tierColor, opacity: 0.6 }}>
                    {tier?.diff || ''}
                  </span>
                )}

                {/* Status icons */}
                {!isUnlocked && <Lock size={14} className="text-slate-600 absolute top-2 right-2" />}
                {isUnlocked && !hasBestTime && (
                  <Play size={12} className="absolute top-2 right-2" style={{ color: `${tierColor}50` }} />
                )}
                {isUnlocked && hasBestTime && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-green-500/20 border border-green-500/40 flex items-center justify-center">
                    <CheckCircle size={10} className="text-green-400" />
                  </div>
                )}

                {/* Best time */}
                {isUnlocked && hasBestTime && (
                  <div className="flex items-center gap-1 mt-1 text-[8px] font-mono" style={{ color: `${tierColor}80` }}>
                    <Timer size={8} />
                    {formatTime(bestTimes[realIndex])}
                  </div>
                )}
              </motion.button>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
