'use client';
import { motion } from 'framer-motion';

export default function LandingPage({ onStart }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen relative px-4">
      {/* Background Animated Gradients */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full filter blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full filter blur-[120px] animate-pulse delay-700" />

      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="text-center z-10"
      >
        <h1 className="text-6xl md:text-8xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-zinc-400 mb-2">
          Art therapy website
        </h1>
        <p className="text-zinc-500 text-sm md:text-base tracking-widest uppercase mb-12">
          Developed by Aarav
        </p>
        
        <motion.button
          whileHover={{ scale: 1.05, translateY: -2 }}
          whileTap={{ scale: 0.98 }}
          onClick={onStart}
          className="px-8 py-4 bg-white text-black font-medium rounded-full shadow-lg shadow-white/10 hover:shadow-white/20 transition-all duration-300"
        >
          Start Now
        </motion.button>
      </motion.div>
    </div>
  );
}
