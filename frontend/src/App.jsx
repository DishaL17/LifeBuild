import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
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

function AppContent() {
  const location = useLocation();
  const [currentUser, setCurrentUser] = useState({
    username: 'Ash Ketchum',
    level: 3,
  });

  const handleLogout = () => {
    setCurrentUser(null);
  };

  // Hide Navbar & Sidebar on auth pages for a full-screen Pokedex interface
  const authPaths = ['/', '/landing', '/login', '/signup'];
  const isAuthPage = authPaths.includes(location.pathname);

  return (
    <div className="app-layout">
      {!isAuthPage && (
        <Navbar user={currentUser} onLogout={handleLogout} />
      )}
      
      <div className="app-body">
        {!isAuthPage && (
          <Sidebar />
        )}
        
        <main className={`app-main ${isAuthPage ? 'full-width' : ''}`}>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/landing" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/character" element={<Character />} />
            <Route path="/achievements" element={<Achievements />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/inventory" element={<Inventory />} />
            
            {/* Fallback route */}
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}