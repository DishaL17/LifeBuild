import React from 'react';
import { Link } from 'react-router-dom';

export default function Landing() {
  return (
    <div style={{ padding: '2rem', color: '#fff', textAlign: 'center' }}>
      <h1>⚡ Life RPG - Pokémon Trainer Hub</h1>
      <p>Turn your real-life daily tasks into XP and level up!</p>
      <Link to="/login" style={{ color: '#facc15', fontWeight: 'bold' }}>Go to Trainer Login</Link>
    </div>
  );
}