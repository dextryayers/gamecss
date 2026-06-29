import { Diamond, Play, Grid, BookOpen, PenTool, Github, Palette, Terminal } from 'lucide-react';
import { useGameStore } from '../game/store';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function Menu() {
  const { unlockedLevel, toggleGuidebook } = useGameStore();
  const navigate = useNavigate();

  return (
    <div className="h-full w-full flex flex-col items-center justify-center overflow-y-auto p-4 md:p-8 relative z-10">
      {/* Terminal top bar */}
      <div className="absolute top-0 left-0 right-0 h-7 bg-[#0a0a1a] border-b border-white/5 flex items-center px-3 gap-2 z-10">
        <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
        <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
        <span className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
        <span className="text-[8px] font-mono text-slate-600 ml-2">css-maze@v1.0 — bash</span>
      </div>

      <a
        href="https://github.com/dextryayers/gamecss"
        target="_blank"
        rel="noopener noreferrer"
        className="absolute top-10 right-4 md:right-8 p-2 md:p-3 bg-white/5 hover:bg-white/10 rounded-full text-white transition-colors border border-white/5 flex items-center gap-2 group z-10"
      >
        <Github size={18} className="group-hover:text-[#00e5ff] transition-colors" />
        <span className="hidden md:inline-block text-xs font-medium group-hover:text-[#00e5ff] transition-colors">GitHub</span>
      </a>

      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center text-center max-w-2xl py-12"
      >
        {/* Brand icon */}
        <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center border mb-5 md:mb-6 relative"
          style={{
            background: 'rgba(0,229,255,0.08)',
            borderColor: 'rgba(0,229,255,0.25)',
            boxShadow: '0 0 50px rgba(0,229,255,0.12)',
          }}
        >
          <div className="absolute inset-0 bg-[#00e5ff]/10 blur-xl rounded-full" />
          <Diamond className="text-[#00e5ff] w-8 h-8 md:w-10 md:h-10 relative z-10" />
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-2 md:mb-3">
          CSS Maze
          <span className="block text-xl md:text-3xl mt-1" style={{ color: '#00e5ff' }}>Navigator Pro</span>
        </h1>

        <p className="text-sm md:text-base text-slate-500 font-mono mb-6 md:mb-8 max-w-lg leading-relaxed px-2">
          Write real CSS to navigate interactive mazes. Master transforms, transitions, and keyframes through play.
        </p>

        {/* Terminal prompt */}
        <div className="flex items-center gap-2 text-xs font-mono text-slate-600 mb-6">
          <Terminal size={12} />
          <span>$</span>
          <span className="text-slate-500">./css-maze --start</span>
          <span className="animate-pulse" style={{ color: '#00e5ff' }}>▌</span>
        </div>

        {/* Buttons */}
        <div className="flex flex-col items-center justify-center gap-3 w-full px-2">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full">
            <button
              onClick={() => navigate(`/level/${unlockedLevel + 1}`)}
              className="group relative inline-flex items-center justify-center gap-3 px-6 py-3 md:px-8 md:py-3.5 rounded-xl font-bold text-sm md:text-base transition-all hover:scale-105 active:scale-95 overflow-hidden w-full sm:w-auto"
              style={{
                background: '#00e5ff',
                color: '#070714',
                boxShadow: '0 0 30px rgba(0,229,255,0.3)',
              }}
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
              <Play fill="currentColor" size={20} className="relative z-10" />
              <span className="relative z-10">{unlockedLevel > 0 ? 'CONTINUE GAME' : 'START GAME'}</span>
            </button>
            <button
              onClick={() => navigate('/levels')}
              className="inline-flex items-center justify-center gap-3 px-6 py-3 md:px-8 md:py-3.5 bg-white/5 hover:bg-white/10 text-white font-bold text-sm md:text-base rounded-xl transition-all hover:scale-105 active:scale-95 border border-white/10 w-full sm:w-auto"
            >
              <Grid size={20} />
              <span>LEVELS</span>
            </button>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full mt-1">
            <button
              onClick={() => toggleGuidebook(true)}
              className="inline-flex items-center justify-center gap-3 px-6 py-3 md:px-8 md:py-3.5 bg-white/5 hover:bg-white/10 text-white font-bold text-sm md:text-base rounded-xl transition-all hover:scale-105 active:scale-95 border border-white/10 w-full sm:w-auto"
              style={{ borderColor: 'rgba(0,229,255,0.2)' }}
            >
              <BookOpen size={20} className="text-[#00e5ff]" />
              <span>CSS GUIDEBOOK</span>
            </button>
            <button
              onClick={() => navigate('/builder')}
              className="inline-flex items-center justify-center gap-3 px-6 py-3 md:px-8 md:py-3.5 bg-white/5 hover:bg-white/10 text-white font-bold text-sm md:text-base rounded-xl transition-all hover:scale-105 active:scale-95 border border-white/10 w-full sm:w-auto"
              style={{ borderColor: 'rgba(124,58,237,0.2)' }}
            >
              <PenTool size={20} className="text-[#7c3aed]" />
              <span>LEVEL BUILDER</span>
            </button>
            <button
              onClick={() => navigate('/pallete')}
              className="inline-flex items-center justify-center gap-3 px-6 py-3 md:px-8 md:py-3.5 bg-white/5 hover:bg-white/10 text-white font-bold text-sm md:text-base rounded-xl transition-all hover:scale-105 active:scale-95 border border-white/10 w-full sm:w-auto"
              style={{ borderColor: 'rgba(244,63,94,0.2)' }}
            >
              <Palette size={20} className="text-[#f43f5e]" />
              <span>CSS PALETTE</span>
            </button>
          </div>

          <div className="mt-8 text-[10px] text-slate-700 font-mono tracking-wider">
            Copyright Hanif Abdurrohim {new Date().getFullYear()}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
