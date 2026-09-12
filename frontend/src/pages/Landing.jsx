import React from 'react';
import { Link } from 'react-router-dom';
import './Landing.css';

export default function Landing() {
  return (
    <div className="landing-container">
      <div className="landing-card">
        <div style={{ fontSize: '3.5rem', marginBottom: '0.5rem' }}>⚡ 🧢 🐲</div>
        <h1 className="landing-title">LIFE RPG: POKÉDEX HUB</h1>
        <p style={{ color: '#a1a1aa', fontSize: '1rem' }}>
          Turn your real-world tasks, gym workouts, and coding sessions into XP to level up and evolve your companion Pokémon!
        </p>

        <div className="features-grid">
          <div className="feature-box">
            <h4 style={{ color: '#facc15', margin: '0 0 0.4rem 0' }}>⚡ Real-Life XP</h4>
            <p style={{ color: '#a1a1aa', fontSize: '0.8rem', margin: 0 }}>Gain XP & PokéCoins by completing daily habits and tasks.</p>
          </div>
          <div className="feature-box">
            <h4 style={{ color: '#ef4444', margin: '0 0 0.4rem 0' }}>🔥 Pokémon Evolutions</h4>
            <p style={{ color: '#a1a1aa', fontSize: '0.8rem', margin: 0 }}>Watch Charmander evolve into Charmeleon and Charizard as you level up!</p>
          </div>
          <div className="feature-box">
            <h4 style={{ color: '#38bdf8', margin: '0 0 0.4rem 0' }}>🏆 Gym Badges & Shop</h4>
            <p style={{ color: '#a1a1aa', fontSize: '0.8rem', margin: 0 }}>Unlock 8 Gym Badges and spend PokéCoins in the Pokémart catalog.</p>
          </div>
        </div>

        <div className="btn-landing-group">
          <Link to="/signup" className="btn-landing-primary">COMMENCE QUEST (REGISTER)</Link>
          <Link to="/login" className="btn-landing-secondary">TRAINER LOGIN</Link>
        </div>
      </div>
    </div>
  );
}