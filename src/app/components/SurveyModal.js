'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function SurveyModal({ stage, initialStress, onComplete }) {
  const [score, setScore] = useState(5);
  const [notes, setNotes] = useState('');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xl">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass w-full max-w-xl p-10 rounded-3xl text-center mx-4 border-zinc-800"
      >
        <span className="text-xs font-semibold uppercase tracking-widest text-indigo-400 px-3 py-1 bg-indigo-500/10 rounded-full">
          Assessment Phase
        </span>
        
        <h2 className="text-3xl font-bold mt-6 mb-2">
          {stage === 'before' ? "How stressed are you feeling right now?" : "Post-Therapy Assessment"}
        </h2>
        <p className="text-zinc-400 text-sm mb-10">
          {stage === 'before' ? "On a scale of 1 to 10 (1 being fully calm, 10 being extremely stressed)" : "Let's re-measure your stress level after the mandala interaction."}
        </p>

        {/* Dynamic Interactive Click Grid */}
        <div className="grid grid-cols-5 md:grid-cols-10 gap-2 mb-10">
          {[...Array(10)].map((_, i) => {
            const val = i + 1;
            const isSelected = score === val;
            return (
              <button
                key={val}
                type="button"
                onClick={() => setScore(val)}
                className={`h-14 rounded-xl font-bold text-lg transition-all duration-200 border ${
                  isSelected 
                    ? 'bg-white text-black border-white shadow-xl scale-105' 
                    : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-600 hover:text-white'
                }`}
              >
                {val}
              </button>
            );
          })}
        </div>

        {stage === 'after' && (
          <div className="mb-8 text-left">
            <label className="block text-xs font-medium text-zinc-400 uppercase tracking-wider mb-2">
              Additional Details / Reflective Notes (Optional)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl p-4 h-24 text-white focus:outline-none focus:border-indigo-500 resize-none transition-colors"
              placeholder="How do you feel your focus changed during the process?"
            />
          </div>
        )}

        <button
          onClick={() => onComplete(score, notes)}
          className="w-full py-4 bg-zinc-100 hover:bg-white text-black font-semibold rounded-xl transition-all shadow-lg"
        >
          Submit Answers
        </button>
      </motion.div>
    </div>
  );
}
