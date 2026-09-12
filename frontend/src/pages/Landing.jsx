import React from 'react';

export default function Landing({ onNavigate }) {
  return (
    <div className="landing-page">
      <header className="landing-hero">
        <h1 className="hero-title">Level Up Your Real Life</h1>
        <p className="hero-subtitle">
          Turn your habits, daily goals, and tasks into an epic role-playing adventure.
          Earn XP, level up your stats, and build your character.
        </p>
        <div className="hero-cta">
          <button
            className="btn-primary btn-large"
            onClick={() => onNavigate && onNavigate('signup')}
          >
            Start Your Journey
          </button>
          <button
            className="btn-secondary btn-large"
            onClick={() => onNavigate && onNavigate('login')}
          >
            I Have an Account
          </button>
        </div>
      </header>

      <section className="landing-features">
        <div className="feature-card">
          <div className="feature-icon">⚔️</div>
          <h3>Daily Quests</h3>
          <p>Convert real-world tasks into rewarding quests with XP and gold rewards.</p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">🛡️</div>
          <h3>RPG Stats</h3>
          <p>Boost your Strength, Intelligence, and Discipline by completing specific real-world tasks.</p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">🔥</div>
          <h3>Streak Multipliers</h3>
          <p>Build consistent daily habits and protect your streak to gain bonus multipliers.</p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">🏆</div>
          <h3>Loot & Achievements</h3>
          <p>Unlock badges, collect legendary gear, and spend earned gold in the rewards shop.</p>
        </div>
      </section>
    </div>
  );
}
