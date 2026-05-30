'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

export default function AuthModal({ onClose, onSubmit }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [adminUser, setAdminUser] = useState('');
  const [adminPass, setAdminPass] = useState('');

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (isAdmin) {
      if (adminUser === 'Admin' && adminPass === 'Admin123') {
        onSubmit({ isAdmin: true });
      } else {
        alert('Invalid Admin Credentials');
      }
    } else {
      if (!firstName || !lastName || !email) return;
      onSubmit({ isAdmin: false, firstName, lastName, email });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="glass w-full max-w-md p-8 rounded-3xl relative mx-4"
      >
        <button onClick={onClose} className="absolute top-6 right-6 text-zinc-400 hover:text-white transition-colors">
          <X size={20} />
        </button>

        <div className="flex space-x-4 mb-8 border-b border-zinc-800 pb-2">
          <button 
            type="button"
            className={`text-sm font-medium pb-2 transition-all ${!isAdmin ? 'text-white border-b-2 border-indigo-500' : 'text-zinc-400'}`}
            onClick={() => setIsAdmin(false)}
          >
            User Login
          </button>
          <button 
            type="button"
            className={`text-sm font-medium pb-2 transition-all ${isAdmin ? 'text-white border-b-2 border-indigo-500' : 'text-zinc-400'}`}
            onClick={() => setIsAdmin(true)}
          >
            Admin Access
          </button>
        </div>

        <form onSubmit={handleFormSubmit} className="space-y-5">
          {!isAdmin ? (
            <>
              <div>
                <label className="block text-xs font-medium text-zinc-400 uppercase tracking-wider mb-2">First Name</label>
                <input required type="text" value={firstName} onChange={e => setFirstName(e.target.value)} className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors" placeholder="John" />
              </div>
              <div>
                <label className="block text-xs font-medium text-zinc-400 uppercase tracking-wider mb-2">Last Name</label>
                <input required type="text" value={lastName} onChange={e => setLastName(e.target.value)} className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors" placeholder="Doe" />
              </div>
              <div>
                <label className="block text-xs font-medium text-zinc-400 uppercase tracking-wider mb-2">Email Address</label>
                <input required type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors" placeholder="john.doe@example.com" />
              </div>
            </>
          ) : (
            <>
              <div>
                <label className="block text-xs font-medium text-zinc-400 uppercase tracking-wider mb-2">Username</label>
                <input required type="text" value={adminUser} onChange={e => setAdminUser(e.target.value)} className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors" placeholder="Admin" />
              </div>
              <div>
                <label className="block text-xs font-medium text-zinc-400 uppercase tracking-wider mb-2">Password</label>
                <input required type="password" value={adminPass} onChange={e => setAdminPass(e.target.value)} className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors" placeholder="••••••••" />
              </div>
            </>
          )}

          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            type="submit"
            className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-xl transition-colors mt-4 shadow-lg shadow-indigo-600/20"
          >
            Continue
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
