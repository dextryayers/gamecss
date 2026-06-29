import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Copy, Play, Check, ChevronLeft, Terminal } from 'lucide-react';
import toast from 'react-hot-toast';

export default function LevelBuilder() {
  const [size, setSize] = useState(5);
  const [grid, setGrid] = useState<string[]>(Array(5).fill('.....'));
  const [targetCss, setTargetCss] = useState('transform: translateX(100px);');
  const [basicTip, setBasicTip] = useState('Gunakan transform');
  const [proTip, setProTip] = useState('Coba gunakan kalkulasi dinamis');
  const [minSteps, setMinSteps] = useState(1);
  const [copied, setCopied] = useState(false);
  
  const navigate = useNavigate();

  const handleSizeChange = (newSize: number) => {
    if (newSize < 3 || newSize > 15) return;
    setSize(newSize);
    const emptyRow = '.'.repeat(newSize);
    const newGrid = Array(newSize).fill(emptyRow);
    setGrid(newGrid);
  };

  const handleCellClick = (r: number, c: number, type: string) => {
    setGrid(prev => {
      const newGrid = [...prev];
      const row = newGrid[r].split('');
      if (type === 'S' || type === 'E') {
        for (let i = 0; i < newGrid.length; i++) {
          const oldRow = newGrid[i].split('');
          const oldIdx = oldRow.indexOf(type);
          if (oldIdx !== -1) {
            oldRow[oldIdx] = '.';
            newGrid[i] = oldRow.join('');
          }
        }
      }
      const newRow = newGrid[r].split('');
      if (newRow[c] === type) {
        newRow[c] = '.';
      } else {
        newRow[c] = type;
      }
      newGrid[r] = newRow.join('');
      return newGrid;
    });
  };

  const generateData = () => {
    if (!grid.some(row => row.includes('S'))) return null;
    if (!grid.some(row => row.includes('E'))) return null;
    const levelData = { size, grid, targetCss, tips: { basic: basicTip, pro: proTip }, minSteps };
    return encodeURIComponent(btoa(JSON.stringify(levelData)));
  };

  const handleCopyLink = () => {
    const data = generateData();
    if (!data) { toast.error('Pastikan ada titik mulai (S) dan akhir (E)'); return; }
    const url = `${window.location.origin}/level/custom?data=${data}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    toast.success('Link level disalin!');
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePlay = () => {
    const data = generateData();
    if (!data) { toast.error('Pastikan ada titik mulai (S) dan akhir (E)'); return; }
    navigate(`/level/custom?data=${data}`);
  };

  const [currentTool, setCurrentTool] = useState('S');

  return (
    <div className="min-h-screen bg-[#070714] text-slate-200 flex flex-col items-center py-8 px-4 overflow-y-auto">
      <div className="absolute inset-0 pointer-events-none opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#7c3aed]/10 via-[#070714] to-[#070714]" />
      
      {/* Terminal chrome bar */}
      <div className="absolute top-0 left-0 right-0 h-7 bg-[#0a0a1a] border-b border-white/5 flex items-center px-3 gap-2 z-10">
        <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
        <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
        <span className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
        <span className="text-[8px] font-mono text-slate-600 ml-2">css-maze@v1.0 — builder</span>
      </div>

      <div className="w-full max-w-4xl relative z-10 flex flex-col gap-6 mt-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/')}
            className="p-2 rounded-xl transition-colors"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <ChevronLeft className="text-slate-400" />
          </button>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white font-pixel tracking-tight">
              Level <span style={{ color: '#7c3aed' }}>Builder</span>
            </h1>
            <div className="flex items-center gap-2 text-[10px] font-mono text-slate-600 mt-1">
              <Terminal size={10} />
              <span>$ ./builder --create</span>
              <span className="animate-pulse" style={{ color: '#7c3aed' }}>▌</span>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Grid Panel */}
          <div className="p-6 rounded-2xl border flex flex-col gap-6"
            style={{ background: '#0f0f20', borderColor: 'rgba(124,58,237,0.15)' }}>
            <h2 className="text-lg font-bold font-mono" style={{ color: '#7c3aed' }}>$ grid --config</h2>
            
            <div>
              <label className="block text-xs text-slate-500 font-mono mb-2">Ukuran Grid: {size}x{size}</label>
              <input type="range" min="3" max="12" value={size}
                onChange={(e) => handleSizeChange(parseInt(e.target.value, 10))}
                className="w-full h-2 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[#7c3aed] [&::-webkit-slider-thumb]:shadow-lg"
                style={{ background: 'linear-gradient(to right, #7c3aed, #00e5ff)' }} />
            </div>
            
            <div>
              <label className="block text-xs text-slate-500 font-mono mb-2">$ tool --select</label>
              <div className="flex gap-2">
                {[
                  { type: 'S', label: 'Start (S)', color: '#10b981' },
                  { type: 'E', label: 'End (E)', color: '#8b5cf6' },
                  { type: '#', label: 'Wall (#)', color: '#7c3aed' },
                ].map(({ type, label, color }) => (
                  <button key={type} onClick={() => setCurrentTool(type)}
                    className="flex-1 py-2 rounded-lg font-bold text-xs transition-all"
                    style={currentTool === type
                      ? { background: `${color}20`, color, border: `1px solid ${color}50` }
                      : { background: 'rgba(255,255,255,0.04)', color: '#64748b', border: '1px solid rgba(255,255,255,0.06)' }}>{label}</button>
                ))}
              </div>
            </div>

            <div className="flex-1 flex items-center justify-center rounded-xl border p-4"
              style={{ background: '#070714', borderColor: 'rgba(124,58,237,0.1)' }}>
              <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${size}, 1fr)` }}>
                {grid.map((row, r) => row.split('').map((cell, c) => (
                  <div key={`${r}-${c}`}
                    onClick={() => handleCellClick(r, c, currentTool)}
                    onDragEnter={() => handleCellClick(r, c, currentTool)}
                    className={`w-8 h-8 sm:w-10 sm:h-10 border rounded cursor-pointer flex items-center justify-center font-bold select-none text-xs transition-all
                      ${cell === 'S' ? 'border-green-500 text-green-400' :
                        cell === 'E' ? 'border-purple-500 text-purple-400' :
                        cell === '#' ? 'border-[#7c3aed]' :
                        'border-white/10 hover:bg-white/5'}`}
                    style={{
                      background: cell === 'S' ? 'rgba(16,185,129,0.15)' :
                                 cell === 'E' ? 'rgba(139,92,246,0.15)' :
                                 cell === '#' ? 'rgba(124,58,237,0.4)' :
                                 'rgba(255,255,255,0.03)',
                    }}>
                    {cell !== '.' && cell !== '#' && cell}
                  </div>)))}
              </div>
            </div>
          </div>
          
          {/* Settings Panel */}
          <div className="p-6 rounded-2xl border flex flex-col gap-4"
            style={{ background: '#0f0f20', borderColor: 'rgba(124,58,237,0.15)' }}>
            <h2 className="text-lg font-bold font-mono" style={{ color: '#7c3aed' }}>$ level --settings</h2>
            
            <div>
              <label className="block text-xs text-slate-500 font-mono mb-2">Target CSS</label>
              <input type="text" value={targetCss}
                onChange={(e) => setTargetCss(e.target.value)}
                className="w-full bg-[#070714] border rounded-lg p-3 text-sm text-white font-mono focus:outline-none placeholder-slate-600 transition-colors"
                style={{ borderColor: 'rgba(124,58,237,0.2)', borderImage: 'none' }}
                onFocus={(e) => e.target.style.borderColor = '#7c3aed80'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(124,58,237,0.2)'}
                placeholder="transform: translateX(100px);" />
            </div>
            
            <div>
              <label className="block text-xs text-slate-500 font-mono mb-2">Tips Dasar</label>
              <input type="text" value={basicTip}
                onChange={(e) => setBasicTip(e.target.value)}
                className="w-full bg-[#070714] border rounded-lg p-3 text-sm text-white font-mono focus:outline-none placeholder-slate-600 transition-colors"
                style={{ borderColor: 'rgba(124,58,237,0.2)', borderImage: 'none' }}
                onFocus={(e) => e.target.style.borderColor = '#7c3aed80'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(124,58,237,0.2)'} />
            </div>
            
            <div>
              <label className="block text-xs text-slate-500 font-mono mb-2">Tips Pro</label>
              <input type="text" value={proTip}
                onChange={(e) => setProTip(e.target.value)}
                className="w-full bg-[#070714] border rounded-lg p-3 text-sm text-white font-mono focus:outline-none placeholder-slate-600 transition-colors"
                style={{ borderColor: 'rgba(124,58,237,0.2)', borderImage: 'none' }}
                onFocus={(e) => e.target.style.borderColor = '#7c3aed80'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(124,58,237,0.2)'} />
            </div>
            
            <div>
              <label className="block text-xs text-slate-500 font-mono mb-2">Minimal Langkah (Par)</label>
              <input type="number" value={minSteps}
                onChange={(e) => setMinSteps(parseInt(e.target.value, 10))}
                className="w-full bg-[#070714] border rounded-lg p-3 text-sm text-white font-mono focus:outline-none placeholder-slate-600 transition-colors"
                style={{ borderColor: 'rgba(124,58,237,0.2)', borderImage: 'none' }}
                onFocus={(e) => e.target.style.borderColor = '#7c3aed80'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(124,58,237,0.2)'} min="1" />
            </div>
            
            <div className="mt-auto pt-6 flex gap-4">
              <button onClick={handleCopyLink}
                className="flex-1 py-3 rounded-lg font-bold text-sm transition-all flex items-center justify-center gap-2 border"
                style={{ background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.1)', color: '#fff' }}>
                {copied ? <Check size={20} className="text-green-400" /> : <Copy size={20} />}
                {copied ? 'Tersalin' : 'Salin URL'}
              </button>
              <button onClick={handlePlay}
                className="flex-1 py-3 rounded-lg font-bold text-sm transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
                style={{ background: '#7c3aed', color: '#fff', boxShadow: '0 0 30px rgba(124,58,237,0.3)' }}>
                <Play fill="currentColor" size={20} />
                Mainkan
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
