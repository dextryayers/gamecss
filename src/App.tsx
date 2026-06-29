/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Routes, Route, Navigate } from 'react-router-dom';
import Menu from './components/Menu';
import LevelsPage from './pages/LevelsPage';
import GameEngine from './pages/GameEngine';
import LevelBuilder from './pages/LevelBuilder';
import PalletePage from './pages/PalletePage';
import GuidebookModal from './components/GuidebookModal';
import { Toaster } from 'react-hot-toast';

export default function App() {
  return (
    <div className="h-screen bg-[#070714] text-slate-200 flex flex-col overflow-hidden font-sans selection:bg-[#00e5ff]/30 crt">
      {/* Global Background */}
      <div className="absolute inset-0 pointer-events-none opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#00e5ff]/10 via-[#070714] to-[#070714]" />
      
      <Routes>
        <Route path="/" element={<Menu />} />
        <Route path="/levels" element={<LevelsPage />} />
        <Route path="/level/:id" element={<GameEngine />} />
        <Route path="/builder" element={<LevelBuilder />} />
        <Route path="/pallete" element={<PalletePage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      
      <GuidebookModal />
      
      <Toaster 
        position="top-center"
        toastOptions={{
          style: {
            background: '#0f0f20',
            color: '#fff',
            border: '1px solid rgba(0,229,255,0.15)',
            fontSize: '12px',
            fontFamily: 'JetBrains Mono, monospace',
          }
        }}
      />
    </div>
  );
}
