import React from 'react';
import { Link } from 'react-router-dom';
import './Achievements.css';

export default function Achievements() {
  const badges = [
    { id: 1, name: 'Boulder Badge', desc: 'Reached Trainer Level 5', icon: '🪨', unlocked: true },
    { id: 2, name: 'Cascade Badge', desc: 'Completed 10 Strength Tasks', icon: '💧', unlocked: true },
    { id: 3, name: 'Thunder Badge', desc: 'Maintained 5-Day Active Streak', icon: '⚡', unlocked: true },
    { id: 4, name: 'Rainbow Badge', desc: 'Reached 30 Intellect Points', icon: '🌈', unlocked: false },
    { id: 5, name: 'Soul Badge', desc: 'Reached 30 Wisdom Points', icon: '🔮', unlocked: false },
    { id: 6, name: 'Marsh Badge', desc: 'Reached Trainer Level 15', icon: '🌀', unlocked: false },
    { id: 7, name: 'Volcano Badge', desc: 'Reached 30 Agility Points', icon: '🌋', unlocked: false },
    { id: 8, name: 'Earth Badge', desc: 'Reached Level 25 Master', icon: '🌍', unlocked: false },
  ];

  return (
    <div className="achievements-container">
      <div className="achievements-content">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 style={{ color: '#facc15', margin: 0 }}>🏆 GYM BADGES SHOWCASE</h1>
          <Link to="/dashboard" style={{ color: '#ef4444', fontWeight: 'bold', textDecoration: 'none' }}>⬅️ Back to Dashboard</Link>
        </div>

        <p style={{ color: '#a1a1aa' }}>Earn Gym Badges as you reach real-life productivity milestones!</p>

        <div className="badge-showcase-grid">
          {badges.map((b) => (
            <div key={b.id} className={`badge-card ${b.unlocked ? 'unlocked' : ''}`}>
              <div style={{ fontSize: '2.5rem', marginBottom: '0.4rem' }}>{b.icon}</div>
              <h4 style={{ color: b.unlocked ? '#facc15' : '#71717a', margin: '0.2rem 0' }}>{b.name}</h4>
              <p style={{ color: '#a1a1aa', fontSize: '0.75rem', margin: 0 }}>{b.desc}</p>
              <span style={{ display: 'inline-block', marginTop: '0.6rem', fontSize: '0.7rem', fontWeight: 'bold', padding: '0.2rem 0.5rem', borderRadius: '6px', background: b.unlocked ? 'rgba(34, 197, 94, 0.2)' : '#27272a', color: b.unlocked ? '#22c55e' : '#71717a' }}>
                {b.unlocked ? 'UNLOCKED' : 'LOCKED'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}