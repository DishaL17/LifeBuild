import React from 'react';
import { Link } from 'react-router-dom';
import './Character.css';

export default function Character() {
  const trainer = {
    name: 'Ash Ketchum',
    title: 'Pokémon Master in Training',
    level: 3,
    streak: 5,
    str: 15,
    int: 20,
    wis: 12,
    agi: 14,
    hp: 100,
    companion: 'Charmeleon (Stage 1 Fire)',
  };

  return (
    <div className="character-container">
      <div className="character-content">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 style={{ color: '#facc15', margin: 0 }}>🆔 TRAINER LICENSE</h1>
          <Link to="/dashboard" style={{ color: '#ef4444', fontWeight: 'bold', textDecoration: 'none' }}>⬅️ Back to Dashboard</Link>
        </div>

        <div className="license-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', marginBottom: '1.5rem' }}>
            <div style={{ fontSize: '3rem', width: '75px', height: '75px', background: '#09090b', borderRadius: '50%', border: '2px solid #ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              🧢
            </div>
            <div>
              <h2 style={{ color: '#facc15', margin: '0 0 0.2rem 0' }}>{trainer.name}</h2>
              <span style={{ background: '#ef4444', color: '#fff', fontSize: '0.75rem', padding: '0.2rem 0.6rem', borderRadius: '6px', fontWeight: 'bold' }}>
                LEVEL {trainer.level} TRAINER
              </span>
            </div>
          </div>

          <h3 style={{ color: '#38bdf8', marginBottom: '0.75rem' }}>📊 Attribute Stats Breakdown</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div className="stat-row-item">
              <span>🥊 Attack (STR) — Gym & Workouts</span>
              <strong style={{ color: '#ef4444' }}>{trainer.str} Points</strong>
            </div>
            <div className="stat-row-item">
              <span>⚡ Sp. Atk (INT) — Coding & Study</span>
              <strong style={{ color: '#38bdf8' }}>{trainer.int} Points</strong>
            </div>
            <div className="stat-row-item">
              <span>🔮 Sp. Def (WIS) — Reading & Focus</span>
              <strong style={{ color: '#a855f7' }}>{trainer.wis} Points</strong>
            </div>
            <div className="stat-row-item">
              <span>💨 Speed (AGI) — Habit Consistency</span>
              <strong style={{ color: '#34d399' }}>{trainer.agi} Points</strong>
            </div>
            <div className="stat-row-item">
              <span>❤️ Stamina (HP) — Wellness & Sleep</span>
              <strong style={{ color: '#f472b6' }}>{trainer.hp} HP</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}