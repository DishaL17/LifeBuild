import React from 'react';

export default function Navbar({ user, onLogout }) {
  return (
    <header className="navbar">
      <div className="navbar-brand">
        <span className="navbar-logo">⚔️</span>
        <span className="navbar-title">LifeBuild</span>
      </div>

      <div className="navbar-actions">
        {user ? (
          <div className="navbar-user">
            <span className="navbar-username">{user.username || 'Adventurer'}</span>
            <span className="navbar-badge">Lv. {user.level || 1}</span>
            <button className="btn-secondary" onClick={onLogout}>
              Logout
            </button>
          </div>
        ) : (
          <div className="navbar-auth-links">
            <a href="#login" className="btn-secondary">Login</a>
            <a href="#signup" className="btn-primary">Sign Up</a>
          </div>
        )}
      </div>
    </header>
  );
}
