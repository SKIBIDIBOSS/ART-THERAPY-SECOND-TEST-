'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, BarChart3, LogOut, UserPlus, ShieldAlert, Trash2 } from 'lucide-react';

export default function AdminPanel({ users, logs, setUsers, onLogout }) {
  const [activeTab, setActiveTab] = useState('accounts'); // accounts, assign, charts
  const [selectedUser, setSelectedUser] = useState(null);

  // Creation Subtab Fields
  const [newFirst, setNewFirst] = useState('');
  const [newLast, setNewLast] = useState('');
  const [newEmail, setNewEmail] = useState('');

  const banUser = (id) => {
    const reason = prompt("Enter explicit reason parameter for banning this participant profile:");
    if (reason === null) return; // cancel
    setUsers(prev => prev.map(u => u.id === id ? { ...u, banned: true, banReason: reason || 'Violation of systematic code patterns.' } : u));
    if(selectedUser && selectedUser.id === id) {
      setSelectedUser(prev => ({...prev, banned: true, banReason: reason}));
    }
  };

  const deleteUser = (id) => {
    if (confirm("Confirm complete profile purges from localized state directory?")) {
      setUsers(prev => prev.filter(u => u.id !== id));
      setSelectedUser(null);
    }
  };

  const handleAssignSubmit = (e) => {
    e.preventDefault();
    if (!newFirst || !newLast || !newEmail) return;
    const newUser = { id: Date.now().toString(), firstName: newFirst, lastName: newLast, email: newEmail, banned: false, banReason: '' };
    setUsers(prev => [...prev, newUser]);
    setNewFirst(''); setNewLast(''); setNewEmail('');
    alert('User Registered Successfully.');
    setActiveTab('accounts');
  };

  return (
    <div className="flex h-screen w-full text-zinc-100 bg-background overflow-hidden">
      
      {/* Navigation Admin Column */}
      <div className="w-64 border-r border-zinc-800 glass flex flex-col justify-between p-6">
        <div>
          <div className="mb-10">
            <h2 className="text-xl font-bold tracking-tight bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Admin Interface</h2>
            <p className="text-xs text-zinc-500 uppercase tracking-widest mt-1">PhD Engine Console</p>
          </div>

          <nav className="space-y-2">
            <button 
              onClick={() => setActiveTab('accounts')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === 'accounts' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/10' : 'text-zinc-400 hover:text-white hover:bg-zinc-900'}`}
            >
              <Users size={18} />
              <span>Accounts Directory</span>
            </button>
            <button 
              onClick={() => setActiveTab('assign')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === 'assign' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/10' : 'text-zinc-400 hover:text-white hover:bg-zinc-900'}`}
            >
              <UserPlus size={18} />
              <span>Assign Logins</span>
            </button>
            <button 
              onClick={() => setActiveTab('charts')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === 'charts' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/10' : 'text-zinc-400 hover:text-white hover:bg-zinc-900'}`}
            >
              <BarChart3 size={18} />
              <span>Analytical Graphics</span>
            </button>
          </nav>
        </div>

        <button onClick={onLogout} className="w-full flex items-center space-x-3 px-4 py-3 text-zinc-500 hover:text-red-400 hover:bg-red-500/10 rounded-xl text-sm font-medium transition-all">
          <LogOut size={18} />
          <span>Exit System</span>
        </button>
      </div>

      {/* Primary Display Windows */}
      <div className="flex-1 flex overflow-hidden">
        
        <div className="flex-1 p-10 overflow-y-auto">
          {activeTab === 'accounts' && (
            <div className="space-y-6">
              <h3 className="text-2xl font-bold">Manage Systematic User Accounts</h3>
              <div className="grid gap-3">
                {users.map(u => (
                  <div 
                    key={u.id}
                    onClick={() => setSelectedUser(u)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${selectedUser?.id === u.id ? 'bg-zinc-900 border-indigo-500' : 'bg-zinc-900/40 border-zinc-800/80 hover:border-zinc-700'}`}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center font-bold text-indigo-400 text-xs uppercase">
                        {u.firstName[0]}{u.lastName[0]}
                      </div>
                      <div>
                        <p className="text-sm font-semibold">{u.firstName} {u.lastName}</p>
                        <p className="text-xs text-zinc-500">{u.email}</p>
                      </div>
                    </div>
                    <div className="flex space-x-2" onClick={e => e.stopPropagation()}>
                      {!u.banned ? (
                        <button onClick={() => banUser(u.id)} className="p-2 text-zinc-500 hover:text-yellow-500 transition-colors" title="Ban Account"><ShieldAlert size={16} /></button>
                      ) : (
                        <span className="text-xs font-semibold px-2 py-1 bg-red-500/10 text-red-400 rounded-md border border-red-500/20 mr-2">Banned</span>
                      )}
                      <button onClick={() => deleteUser(u.id)} className="p-2 text-zinc-500 hover:text-red-500 transition-colors" title="Delete Account"><Trash2 size={16} /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'assign' && (
            <div className="max-w-md space-y-6">
              <div>
                <h3 className="text-2xl font-bold">Assign Logins</h3>
                <p className="text-xs text-zinc-400 mt-1">Manually provision verified credential paths into data space state.</p>
              </div>
              <form onSubmit={handleAssignSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-2">First Name</label>
                  <input required type="text" value={newFirst} onChange={e => setNewFirst(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-2">Last Name</label>
                  <input required type="text" value={newLast} onChange={e => setNewLast(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-2">Email</label>
                  <input required type="email" value={newEmail} onChange={e => setNewEmail(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500" />
                </div>
                <button type="submit" className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl shadow-lg transition-colors">
                  Assign & Save User
                </button>
              </form>
            </div>
          )}

          {activeTab === 'charts' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold">Analytical Graphics</h3>
                <p className="text-xs text-zinc-400 mt-1">Live updates: First-Time Stress Scores VS Finished Test Indicators.</p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="glass p-6 rounded-2xl border border-zinc-800">
                  <h4 className="text-xs font-bold uppercase text-zinc-400 tracking-wider mb-4">Initial Incoming Profile Breakdown (Avg)</h4>
                  <div className="h-48 flex items-end justify-between px-4 pt-4 border-b border-zinc-800">
                    {[5, 8, 4, 9, 7, 6, 8, 3, 7, 10].map((v, i) => (
                      <div key={i} className="w-6 bg-red-500/20 hover:bg-red-500 rounded-t transition-all group relative" style={{ height: `${v * 10}%` }}>
                        <span className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-bold bg-zinc-900 px-1 rounded border border-zinc-700">{v}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-[10px] text-zinc-500 text-center mt-2">Historical Distribution Range Metrics</p>
                </div>

                <div className="glass p-6 rounded-2xl border border-zinc-800">
                  <h4 className="text-xs font-bold uppercase text-zinc-400 tracking-wider mb-4">Post-Treatment Mitigation Efficiency Delta</h4>
                  <div className="h-48 flex items-end justify-between px-4 pt-4 border-b border-zinc-800">
                    {[2, 4, 1, 3, 5, 2, 4, 1, 3, 2].map((v, i) => (
                      <div key={i} className="w-6 bg-emerald-500/20 hover:bg-emerald-500 rounded-t transition-all group relative" style={{ height: `${v * 10}%` }}>
                        <span className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-bold bg-zinc-900 px-1 rounded border border-zinc-700">{v}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-[10px] text-zinc-500 text-center mt-2">Mitigated Exit Range Metrics</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Dynamic Nested Inspection Utility Column (Exclusive to Admin) */}
        {activeTab === 'accounts' && (
          <div className="w-96 border-l border-zinc-800 glass p-8 overflow-y-auto">
            {selectedUser ? (
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center font-bold text-indigo-400">
                    {selectedUser.firstName[0]}{selectedUser.lastName[0]}
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">{selectedUser.firstName} {selectedUser.lastName}</h4>
                    <p className="text-xs text-zinc-500">{selectedUser.email}</p>
                  </div>
                </div>

                <hr className="border-zinc-800" />

                <div>
                  <h5 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-3">Session Activity Sequence (Stacked)</h5>
                  <div className="space-y-3">
                    {logs.filter(l => l.userId === selectedUser.id).map(log => (
                      <div key={log.id} className="p-4 rounded-xl bg-zinc-900 border border-zinc-800/60 text-xs space-y-2">
                        <div className="flex justify-between font-medium">
                          <span className="text-red-400">Pre-Stress Level: {log.initialStress}</span>
                          <span className="text-emerald-400">Post-Stress Level: {log.finalStress}</span>
                        </div>
                        {log.notes && (
                          <div className="mt-2 pt-2 border-t border-zinc-800">
                            <button 
                              onClick={() => alert(`Full Log Note Profile Content:\n\n"${log.notes}"`)}
                              className="text-[11px] text-indigo-400 hover:underline font-medium"
                            >
                              See More Detail Log Notes...
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                    {logs.filter(l => l.userId === selectedUser.id).length === 0 && (
                      <p className="text-xs text-zinc-500 italic">No structured assessment sequences run for this profile yet.</p>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-center text-zinc-500 text-xs italic">
                Select an account signature card from the directory list to display granular PhD metrics data profiles.
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
