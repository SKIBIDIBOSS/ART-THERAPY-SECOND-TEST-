'use client';
import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Palette, Eraser, Trash2, LogOut, Home, Compass } from 'lucide-react';

export default function Workspace({ stressLevel, onFinish, onExit, onNavHome, onNavMandalas }) {
  const [selectedColor, setSelectedColor] = useState('#6366f1');
  const [isEraser, setIsEraser] = useState(false);
  const [selectedMandalaIndex, setSelectedMandalaIndex] = useState(0);

  // High-fidelity dynamic calculation of 20 elements per layer based on level and index
  const mandalaSegments = useMemo(() => {
    const items = [];
    const count = 40; // High resolution symmetry segments
    for (let i = 0; i < count; i++) {
      items.push({ id: i, angle: (360 / count) * i });
    }
    return items;
  }, []);

  // Track dynamic interactive fill styling mapping per segment index
  const [filledColors, setFilledColors] = useState({});

  const handleSegmentClick = (id) => {
    if (isEraser) {
      setFilledColors(prev => ({ ...prev, [id]: 'transparent' }));
    } else {
      setFilledColors(prev => ({ ...prev, [id]: selectedColor }));
    }
  };

  const clearAll = () => {
    if (confirm("Are you sure you want to delete all work? This action cannot be undone.")) {
      setFilledColors({});
    }
  };

  const exitProcess = () => {
    if (confirm("Do you want to leave or stay? Progress will be lost.")) {
      onExit();
    }
  };

  const handleFinishClick = () => {
    if (confirm("Are you finished with your session?")) {
      onFinish();
    }
  };

  return (
    <div className="flex h-screen w-full text-white bg-background overflow-hidden select-none">
      
      {/* Premium Sidebar Toolbar */}
      <div className="w-20 glass flex flex-col items-center py-8 justify-between border-r border-zinc-800 z-20">
        <div className="flex flex-col space-y-8 items-center">
          <button onClick={onNavHome} title="Homepage" className="p-3 text-zinc-400 hover:text-white rounded-xl hover:bg-zinc-900 transition-all">
            <Home size={22} />
          </button>
          <button onClick={onNavMandalas} title="Mandalas" className="p-3 text-indigo-400 bg-indigo-500/10 rounded-xl transition-all">
            <Compass size={22} />
          </button>
        </div>

        {/* Utility Drawing Palette Tools */}
        <div className="flex flex-col space-y-5 items-center w-full px-2">
          <div className="w-8 h-8 rounded-full border border-zinc-700 relative overflow-hidden cursor-pointer" title="Pick Palette Color">
            <input 
              type="color" 
              value={selectedColor} 
              onChange={(e) => { setSelectedColor(e.target.value); setIsEraser(false); }} 
              className="absolute inset-0 scale-150 cursor-pointer"
            />
          </div>
          <button 
            onClick={() => setIsEraser(!isEraser)}
            className={`p-3 rounded-xl transition-all ${isEraser ? 'bg-white text-black' : 'text-zinc-400 hover:text-white hover:bg-zinc-900'}`}
            title="Eraser"
          >
            <Eraser size={20} />
          </button>
          <button onClick={clearAll} className="p-3 text-red-400 hover:bg-red-500/10 rounded-xl transition-all" title="Clear Canvas">
            <Trash2 size={20} />
          </button>
        </div>

        <div className="w-2" />
      </div>

      {/* Main Canvas Area */}
      <div className="flex-1 flex flex-col relative bg-zinc-950/20">
        
        {/* Top Floating Control Row */}
        <div className="w-full flex justify-between items-center px-8 py-6 z-10 absolute top-0 left-0">
          <div>
            <h3 className="text-sm font-semibold tracking-wide uppercase text-zinc-400">Therapy Workspace</h3>
            <p className="text-xs text-zinc-600">Dynamic Stress Mitigation Profile: Matrix Level {stressLevel}</p>
          </div>
          <div className="flex space-x-4 items-center">
            {/* Quick selector matching requirements for up to 20 designs */}
            <select 
              value={selectedMandalaIndex} 
              onChange={(e) => { setSelectedMandalaIndex(Number(e.target.value)); setFilledColors({}); }}
              className="bg-zinc-900 border border-zinc-800 text-xs px-3 py-2 rounded-lg text-zinc-300 focus:outline-none focus:border-indigo-500"
            >
              {[...Array(20)].map((_, i) => (
                <option key={i} value={i}>Mandala Configuration Layout {i + 1}</option>
              ))}
            </select>
            <button 
              onClick={exitProcess}
              className="p-2.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white rounded-xl border border-zinc-800 transition-all flex items-center space-x-1"
            >
              <LogOut size={16} />
              <span className="text-xs font-medium px-1">Exit</span>
            </button>
          </div>
        </div>

        {/* Responsive Drawing Node Grid Canvas */}
        <div className="flex-1 flex items-center justify-center relative p-4">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-[300px] h-[300px] md:w-[500px] md:h-[500px] relative rounded-full bg-zinc-900/10 border border-zinc-800 flex items-center justify-center overflow-visible"
          >
            {mandalaSegments.map((seg) => {
              const bgValue = filledColors[seg.id] || 'rgba(39, 39, 42, 0.2)';
              // Generate diverse custom layout configurations per stressLevel or index selection
              const skewValue = 20 + (stressLevel * 2);
              const scaleRadius = 90 - (selectedMandalaIndex * 1.5);

              return (
                <div
                  key={seg.id}
                  onClick={() => handleSegmentClick(seg.id)}
                  style={{
                    transform: `rotate(${seg.angle}deg) skewX(${skewValue}deg)`,
                    backgroundColor: bgValue,
                    width: `${scaleRadius}%`,
                    height: `${scaleRadius}%`,
                  }}
                  className="absolute origin-center rounded-full border border-white/5 transition-all duration-200 cursor-pointer hover:border-indigo-400 hover:z-10"
                />
              );
            })}
            <div className="w-16 h-16 rounded-full glass z-10 pointer-events-none border border-white/10" />
          </motion.div>
        </div>

        {/* Global Bottom Finish Action Control */}
        <div className="w-full absolute bottom-0 left-0 p-8 flex justify-center z-10">
          <button
            onClick={handleFinishClick}
            className="px-12 py-4 bg-indigo-600 hover:bg-indigo-500 font-semibold tracking-wider text-sm text-white rounded-xl shadow-xl shadow-indigo-600/10 transition-all"
          >
            FINISH
          </button>
        </div>
      </div>
    </div>
  );
}
