import { useState, useMemo } from 'react';
import Editor from '@monaco-editor/react';
import { Play, RotateCcw, Lightbulb, Terminal, MoveRight, RotateCw, Shrink, Timer } from 'lucide-react';
import { useGameStore } from '../game/store';
import { parseCSS } from '../game/cssParser';
import toast from 'react-hot-toast';
import { getDifficultyLabel } from '../game/levels';

export default function EditorPanel() {
  const { code, setCode, executeMove, undo, combo, currentLevelData, isLevelComplete } = useGameStore();
  const lvl = currentLevelData;
  const diff = lvl.difficulty ? getDifficultyLabel(lvl.difficulty) : null;
  const [tipLevel, setTipLevel] = useState(0);

  // Live parse feedback
  const parsed = useMemo(() => {
    try {
      return parseCSS(code);
    } catch { return null; }
  }, [code]);

  const handleExecute = () => {
    try {
      // Read fresh value from store to avoid stale closure
      const freshCode = useGameStore.getState().code;
      const result = parseCSS(freshCode);
      if (result.dx === 0 && result.dy === 0 && result.rotation === 0 && result.scale === 1) {
        toast.error("Tidak ada pergerakan. Coba tambah properti CSS!", { duration: 3000 });
        return;
      }
      const success = executeMove(result.dx, result.dy, result.rotation, result.scale);
      if (!success) {
        toast.error("Tabrak tembok! Coba rute lain.", { icon: '💥', duration: 2500 });
      } else if (combo > 0) {
        toast.success(`Combo x${combo + 1}! 🔥`, { duration: 1500 });
      }
    } catch (e) {
      toast.error("CSS Syntax Error — periksa kode kamu.");
    }
  };

  const showHint = () => {
    setTipLevel(prev => Math.min(prev + 1, 2));
    toast.custom((t) => (
      <div className={`${t.visible ? 'animate-enter' : 'animate-leave'} max-w-[90vw] md:max-w-md w-full shadow-2xl rounded-xl pointer-events-auto overflow-hidden relative`}
        style={{ background: '#0f0f20', border: '1px solid rgba(255,255,255,0.08)' }}>
        <div className="absolute top-0 left-0 w-full h-0.5" style={{ background: `linear-gradient(to right, ${diff?.color || '#00e5ff'}, #7c3aed)` }} />
        <div className="p-4">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-full shrink-0" style={{ background: `${diff?.color}15`, border: `1px solid ${diff?.color}30`, color: diff?.color || '#00e5ff' }}>
              <Lightbulb size={16} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                {[0, 1, 2].map(i => (
                  <span key={i} className={`text-[9px] px-1.5 py-0.5 rounded font-mono ${tipLevel >= i ? 'text-slate-900' : 'text-slate-600 border border-white/10'}`}
                    style={tipLevel >= i ? { background: diff?.color || '#00e5ff', color: '#070714' } : {}}>
                    Tip {i + 1}
                  </span>
                ))}
              </div>
              <div className="space-y-1">
                {tipLevel >= 0 && <p className="text-xs text-slate-300 leading-relaxed">{lvl.tips?.basic}</p>}
                {tipLevel >= 1 && (
                  <div className="pt-1.5 border-t border-white/5">
                    <p className="text-xs text-slate-400 leading-relaxed">💡 <span style={{ color: diff?.color || '#00e5ff' }}>Pro:</span> {lvl.tips?.pro}</p>
                  </div>
                )}
                {tipLevel >= 2 && (
                  <div className="pt-1.5 border-t border-white/5">
                    <p className="text-[11px] font-mono" style={{ color: diff?.color || '#00e5ff' }}>
                      $ hint: coba properti CSS lain seperti margin, padding, atau filter
                    </p>
                  </div>
                )}
              </div>
              {tipLevel < 2 && (
                <button onClick={() => setTipLevel(prev => Math.min(prev + 1, 2))}
                  className="mt-2 text-[10px] font-mono transition-colors"
                  style={{ color: diff?.color || '#00e5ff' }}>
                  $ reveal more hints...
                </button>
              )}
            </div>
          </div>
        </div>
        <button onClick={() => toast.dismiss(t.id)} className="absolute top-2 right-2 p-1 rounded text-slate-500 hover:text-white hover:bg-white/10 transition-colors">×</button>
      </div>
    ), { id: 'hint-toast', duration: 15000 });
  };

  return (
    <div className="flex flex-col h-full text-white">
      {/* Terminal Title Bar */}
      <div className="h-8 md:h-9 flex items-center justify-between px-3 border-b border-white/5 shrink-0" style={{ background: '#0a0a1a' }}>
        <div className="flex items-center gap-2">
          <Terminal size={12} className="text-[#00e5ff]" />
          <span className="font-mono text-[10px] md:text-xs text-slate-400">
            css-terminal<span className="text-slate-600">:~$</span>
          </span>
        </div>
        <div className="flex items-center gap-2">
          {diff && (
            <span className="text-[8px] font-mono px-1.5 py-0.5 rounded uppercase tracking-widest"
              style={{ background: `${diff.color}15`, color: diff.color }}>
              {diff.label}
            </span>
          )}
          {combo > 0 && !isLevelComplete && (
            <span className="text-[10px] font-bold font-mono text-orange-400 animate-pulse">
              🔥 x{combo}
            </span>
          )}
        </div>
      </div>

      {/* Live CSS feedback bar */}
      {parsed && (
        <div className="flex items-center gap-2 px-3 py-1 border-b border-white/5 overflow-x-auto" style={{ background: '#070714' }}>
          {parsed.dx !== 0 && (
            <span className="flex items-center gap-1 text-[9px] font-mono whitespace-nowrap text-slate-500">
              <MoveRight size={10} className="text-cyan-400" /> X:{parsed.dx > 0 ? '+' : ''}{parsed.dx}
            </span>
          )}
          {parsed.dy !== 0 && (
            <span className="flex items-center gap-1 text-[9px] font-mono whitespace-nowrap text-slate-500">
              <MoveRight size={10} className="text-cyan-400" style={{ transform: 'rotate(90deg)' }} /> Y:{parsed.dy > 0 ? '+' : ''}{parsed.dy}
            </span>
          )}
          {parsed.rotation !== 0 && (
            <span className="flex items-center gap-1 text-[9px] font-mono whitespace-nowrap text-slate-500">
              <RotateCw size={10} className="text-violet-400" /> {parsed.rotation}°
            </span>
          )}
          {parsed.scale !== 1 && (
            <span className="flex items-center gap-1 text-[9px] font-mono whitespace-nowrap text-slate-500">
              <Shrink size={10} className="text-amber-400" /> x{parsed.scale.toFixed(1)}
            </span>
          )}
          {parsed.transitionTime !== 400 && (
            <span className="flex items-center gap-1 text-[9px] font-mono whitespace-nowrap text-slate-500">
              <Timer size={10} className="text-rose-400" /> {parsed.transitionTime}ms
            </span>
          )}
          {parsed.dx === 0 && parsed.dy === 0 && parsed.rotation === 0 && parsed.scale === 1 && (
            <span className="text-[9px] font-mono text-slate-600">Belum ada pergerakan — tulis CSS!</span>
          )}
        </div>
      )}

      {/* Editor */}
      <div className="flex-1 min-h-[120px] relative">
        <Editor
          height="100%"
          defaultLanguage="css"
          theme="hc-black"
          value={code}
          onChange={(v) => setCode(v || '')}
          options={{
            minimap: { enabled: false },
            fontSize: window.innerWidth < 768 ? 13 : 15,
            fontFamily: "'JetBrains Mono', monospace",
            suggestOnTriggerCharacters: true,
            quickSuggestions: true,
            padding: { top: 10 },
            scrollBeyondLastLine: false,
            lineNumbers: 'off',
            folding: false,
            glyphMargin: false,
            lineDecorationsWidth: 0,
            lineNumbersMinChars: 0,
          }}
          loading={<div className="p-4 text-[#00e5ff] font-mono text-xs animate-pulse">_</div>}
        />
      </div>

      {/* Bottom Bar */}
      <div className="shrink-0 border-t border-white/5" style={{ background: '#0a0a1a' }}>
        {/* Controls bar */}
        <div className="px-3 py-1.5 flex items-center justify-between border-b border-white/5">
          <div className="flex items-center gap-2">
            <button onClick={showHint}
              className="flex items-center gap-1.5 text-[10px] font-mono transition-colors"
              style={{ color: diff?.color || '#00e5ff' }}>
              <Lightbulb size={12} /> Tips
            </button>
            <span className="text-slate-700">|</span>
            <span className="text-[9px] font-mono text-slate-600">Min steps: {lvl.minSteps}</span>
          </div>
          <button onClick={undo}
            className="flex items-center gap-1.5 text-[10px] font-mono text-slate-500 hover:text-white transition-colors">
            <RotateCcw size={12} /> Undo
          </button>
        </div>

        {/* Execute Button */}
        <div className="p-2 md:p-3">
          <button onClick={handleExecute} disabled={isLevelComplete}
            className="w-full py-2.5 md:py-3 rounded-lg font-bold text-xs md:text-sm flex items-center justify-center gap-2 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-30 disabled:cursor-not-allowed"
            style={{
              background: diff ? `${diff.color}` : '#00e5ff',
              color: '#070714',
              boxShadow: diff ? `0 0 20px ${diff.color}40` : '0 0 20px rgba(0,229,255,0.4)',
            }}>
            <Play fill="currentColor" size={16} />
            RUN / EXECUTE
          </button>
        </div>
      </div>
    </div>
  );
}
