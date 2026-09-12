import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Character from './pages/Character';
import Achievements from './pages/Achievements';
import Shop from './pages/Shop';
import Inventory from './pages/Inventory';
import './App.css';

export default function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          {/* Default route is now Login */}
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected Dashboard & Feature Routes */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/character" element={<Character />} />
          <Route path="/achievements" element={<Achievements />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/inventory" element={<Inventory />} />

          {/* Fallback redirect */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}