import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Achievements.css';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const BADGE_DEFINITIONS = [
  { id: 'boulder', name: 'Boulder Badge', desc: 'Reached Trainer Level 5', icon: '🪨', check: (u) => (u.level || 1) >= 5, progress: (u) => `Level ${u.level || 1} / 5` },
  { id: 'cascade', name: 'Cascade Badge', desc: 'Reached 30 Attack (STR) Points', icon: '💧', check: (u) => (u.str ?? 0) >= 30, progress: (u) => `STR ${u.str ?? 0} / 30` },
  { id: 'thunder', name: 'Thunder Badge', desc: 'Maintained 5-Day Active Streak', icon: '⚡', check: (u) => (u.streak ?? 0) >= 5, progress: (u) => `Streak ${u.streak ?? 0} / 5 days` },
  { id: 'rainbow', name: 'Rainbow Badge', desc: 'Reached 30 Sp. Atk (INT) Points', icon: '🌈', check: (u) => (u.int ?? 0) >= 30, progress: (u) => `INT ${u.int ?? 0} / 30` },
  { id: 'soul', name: 'Soul Badge', desc: 'Reached 30 Sp. Def (WIS) Points', icon: '🔮', check: (u) => (u.wis ?? 0) >= 30, progress: (u) => `WIS ${u.wis ?? 0} / 30` },
  { id: 'marsh', name: 'Marsh Badge', desc: 'Reached Trainer Level 15', icon: '🌀', check: (u) => (u.level || 1) >= 15, progress: (u) => `Level ${u.level || 1} / 15` },
  { id: 'volcano', name: 'Volcano Badge', desc: 'Reached 30 Speed (AGI) Points', icon: '🌋', check: (u) => (u.agi ?? 0) >= 30, progress: (u) => `AGI ${u.agi ?? 0} / 30` },
  { id: 'earth', name: 'Earth Badge', desc: 'Reached Level 25 Master status', icon: '🌍', check: (u) => (u.level || 1) >= 25 || (u.unlockedBadges && u.unlockedBadges.includes('earth')), progress: (u) => `Level ${u.level || 1} / 25` },
];

export default function Achievements() {
  const [user, setUser] = useState(() => {
    const cached = localStorage.getItem('user');
    if (cached) {
      try {
        return JSON.parse(cached);
      } catch {}
    }
    return { level: 1, streak: 0, str: 0, int: 0, wis: 0, agi: 0, hp: 100 };
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    fetch(`${API_BASE}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.user) {
          setUser(data.user);
          localStorage.setItem('user', JSON.stringify(data.user));
        }
      })
      .catch((err) => console.error('Error fetching achievements:', err));
  }, []);

  const unlockedCount = BADGE_DEFINITIONS.filter((b) => b.check(user)).length;

  return (
    <div className="achievements-container">
      <div className="achievements-content">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 style={{ color: '#facc15', margin: 0 }}>🏆 GYM BADGES SHOWCASE</h1>
          <Link to="/dashboard" style={{ color: '#ef4444', fontWeight: 'bold', textDecoration: 'none' }}>⬅️ Back to Dashboard</Link>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#18181b', padding: '0.75rem 1.2rem', borderRadius: '10px', margin: '1rem 0', border: '1px solid #27272a' }}>
          <span style={{ color: '#a1a1aa' }}>Earn official Pokémon League Gym Badges as you hit real productivity goals!</span>
          <span style={{ color: '#facc15', fontWeight: 'bold', fontSize: '1.1rem' }}>Badges Unlocked: {unlockedCount} / 8</span>
        </div>

        <div className="badge-showcase-grid">
          {BADGE_DEFINITIONS.map((b) => {
            const isUnlocked = b.check(user);
            return (
              <div key={b.id} className={`badge-card ${isUnlocked ? 'unlocked' : ''}`}>
                <div style={{ fontSize: '2.5rem', marginBottom: '0.4rem' }}>{b.icon}</div>
                <h4 style={{ color: isUnlocked ? '#facc15' : '#71717a', margin: '0.2rem 0' }}>{b.name}</h4>
                <p style={{ color: '#a1a1aa', fontSize: '0.75rem', margin: 0 }}>{b.desc}</p>
                <div style={{ marginTop: '0.5rem', fontSize: '0.7rem', color: isUnlocked ? '#38bdf8' : '#71717a', fontWeight: 'bold' }}>
                  Progress: {b.progress(user)}
                </div>
                <span
                  style={{
                    display: 'inline-block',
                    marginTop: '0.6rem',
                    fontSize: '0.7rem',
                    fontWeight: 'bold',
                    padding: '0.2rem 0.6rem',
                    borderRadius: '6px',
                    background: isUnlocked ? 'rgba(34, 197, 94, 0.2)' : '#27272a',
                    color: isUnlocked ? '#22c55e' : '#71717a',
                  }}
                >
                  {isUnlocked ? '✓ UNLOCKED' : '🔒 LOCKED'}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}