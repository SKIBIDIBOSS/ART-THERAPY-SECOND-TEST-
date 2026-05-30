'use client';
import { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import AuthModal from './components/AuthModal';
import SurveyModal from './components/SurveyModal';
import Workspace from './components/Workspace';
import AdminPanel from './components/AdminPanel';

export default function Home() {
  const [view, setView] = useState('landing'); // landing, auth, survey, workspace, admin
  const [currentUser, setCurrentUser] = useState(null);
  const [surveyStage, setSurveyStage] = useState('before'); // before, after
  const [initialStress, setInitialStress] = useState(5);
  
  // High-fidelity Mock Database State for users and logs
  const [users, setUsers] = useState([
    { id: '1', firstName: 'Jane', lastName: 'Doe', email: 'jane@test.com', banned: false, banReason: '' }
  ]);
  const [logs, setLogs] = useState([
    { id: 'l1', userId: '1', firstName: 'Jane', lastName: 'Doe', initialStress: 8, finalStress: 4, notes: 'Felt very relaxed after the blue geometric design.' }
  ]);

  const handleLoginSubmit = (data) => {
    if (data.isAdmin) {
      setView('admin');
      return;
    }
    
    // Check if user is banned
    const foundUser = users.find(u => u.email.toLowerCase() === data.email.toLowerCase());
    if (foundUser && foundUser.banned) {
      alert(`Access Denied. You have been banned.\nReason: ${foundUser.banReason}`);
      return;
    }

    // Auto register/login
    let activeUser = foundUser;
    if (!activeUser) {
      activeUser = { id: Date.now().toString(), firstName: data.firstName, lastName: data.lastName, email: data.email, banned: false, banReason: '' };
      setUsers(prev => [...prev, activeUser]);
    }

    setCurrentUser(activeUser);
    setSurveyStage('before');
    setView('survey');
  };

  return (
    <main className="min-h-screen relative w-full overflow-hidden bg-background">
      {view === 'landing' && <setView={setView} onStart={() => setView('auth')} />}
      {view === 'auth' && <AuthModal onClose={() => setView('landing')} onSubmit={handleLoginSubmit} />}
      {view === 'survey' && (
        <SurveyModal 
          stage={surveyStage} 
          initialStress={initialStress}
          onComplete={(score, notes = '') => {
            if (surveyStage === 'before') {
              setInitialStress(score);
              setView('workspace');
            } else {
              // Add entry to logs
              const newLog = {
                id: Date.now().toString(),
                userId: currentUser.id,
                firstName: currentUser.firstName,
                lastName: currentUser.lastName,
                initialStress: initialStress,
                finalStress: score,
                notes: notes
              };
              setLogs(prev => [newLog, ...prev]);
              
              // Process validation popups
              if (score < initialStress) {
                alert(`Good job! You decreased your stress level. You were at ${initialStress} and decreased to ${score}.`);
                if (confirm("Want to do another mandala?")) {
                  setSurveyStage('before');
                  setView('survey');
                } else {
                  setView('landing');
                  setCurrentUser(null);
                }
              } else {
                if (confirm(`Oh no, that's sad. Your stress level did not decrease (Before: ${initialStress}, After: ${score}). Want to try again?`)) {
                  setSurveyStage('before');
                  setView('survey');
                } else {
                  setView('landing');
                  setCurrentUser(null);
                }
              }
            }
          }} 
        />
      )}
      {view === 'workspace' && (
        <Workspace 
          stressLevel={initialStress} 
          onFinish={() => setSurveyStage('after')} 
          onExit={() => { setView('landing'); setCurrentUser(null); }}
          onNavHome={() => setView('landing')}
          onNavMandalas={() => { setSurveyStage('before'); setView('survey'); }}
        />
      )}
      {view === 'admin' && (
        <AdminPanel 
          users={users} 
          logs={logs} 
          setUsers={setUsers}
          onLogout={() => setView('landing')} 
        />
      )}
    </main>
  );
}
