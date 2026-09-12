import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Character.css';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function Character() {
  const [trainer, setTrainer] = useState(() => {
    const cached = localStorage.getItem('user');
    if (cached) {
      try {
        const u = JSON.parse(cached);
        return {
          name: u.name || u.username || 'Trainer',
          level: u.level || 1,
          streak: u.streak || 1,
          str: u.str || 15,
          int: u.int || 20,
          wis: u.wis || 12,
          agi: u.agi || 14,
          hp: u.hp || 100,
          gold: u.gold || 150,
          companion: u.companionMon || 'charmander',
        };
      } catch {
        // fallback
      }
    }
    return {
      name: 'Trainer',
      level: 1,
      streak: 1,
      str: 15,
      int: 20,
      wis: 12,
      agi: 14,
      hp: 100,
      gold: 150,
      companion: 'charmander',
    };
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
          setTrainer({
            name: data.user.name || data.user.username || 'Trainer',
            level: data.user.level || 1,
            streak: data.user.streak || 1,
            str: data.user.str ?? 15,
            int: data.user.int ?? 20,
            wis: data.user.wis ?? 12,
            agi: data.user.agi ?? 14,
            hp: data.user.hp ?? 100,
            gold: data.user.gold ?? 150,
            companion: data.user.companionMon || 'charmander',
          });
          localStorage.setItem('user', JSON.stringify(data.user));
        }
      })
      .catch((err) => console.error('Error fetching trainer license:', err));
  }, []);

  const getTrainerTitle = (level) => {
    if (level >= 25) return 'Pokémon Master';
    if (level >= 15) return 'Gym Leader';
    if (level >= 10) return 'Elite Trainer';
    if (level >= 5) return 'Rising Ace Trainer';
    return 'Rookie Trainer';
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
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <span style={{ background: '#ef4444', color: '#fff', fontSize: '0.75rem', padding: '0.2rem 0.6rem', borderRadius: '6px', fontWeight: 'bold' }}>
                  LEVEL {trainer.level} TRAINER
                </span>
                <span style={{ color: '#a1a1aa', fontSize: '0.8rem' }}>• {getTrainerTitle(trainer.level)}</span>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', background: '#18181b', padding: '0.75rem 1rem', borderRadius: '8px', marginBottom: '1.25rem', border: '1px solid #27272a' }}>
            <span style={{ color: '#f97316', fontWeight: 'bold' }}>🔥 {trainer.streak} Day Active Streak</span>
            <span style={{ color: '#facc15', fontWeight: 'bold' }}>💰 {trainer.gold} PokéCoins</span>
            <span style={{ color: '#38bdf8', fontWeight: 'bold', textTransform: 'capitalize' }}>🐲 Partner: {trainer.companion}</span>
          </div>

          <h3 style={{ color: '#38bdf8', marginBottom: '0.75rem' }}>📊 Attribute Stats Breakdown (From Real Quests)</h3>
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