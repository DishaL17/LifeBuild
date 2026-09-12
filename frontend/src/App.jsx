import { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Character from './pages/Character';
import Achievements from './pages/Achievements';
import Shop from './pages/Shop';
import Inventory from './pages/Inventory';
import './App.css';

function MainApp() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [currentUser, setCurrentUser] = useState({
    username: 'Valerius',
    level: 3,
  });

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentPage('landing');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'landing':
        return <Landing onNavigate={setCurrentPage} />;
      case 'login':
        return <Login onNavigate={setCurrentPage} />;
      case 'signup':
        return <Signup onNavigate={setCurrentPage} />;
      case 'dashboard':
        return <Dashboard />;
      case 'character':
        return <Character />;
      case 'achievements':
        return <Achievements />;
      case 'shop':
        return <Shop />;
      case 'inventory':
        return <Inventory />;
      default:
        return <Dashboard />;
    }
  };

  const isAuthPage = ['landing', 'login', 'signup'].includes(currentPage);

  return (
    <div className="app-layout">
      <Navbar user={currentUser} onLogout={handleLogout} />
      <div className="app-body">
        {!isAuthPage && (
          <Sidebar activeTab={currentPage} onSelectTab={setCurrentPage} />
        )}
        <main className={`app-main ${isAuthPage ? 'full-width' : ''}`}>
          {renderPage()}
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}