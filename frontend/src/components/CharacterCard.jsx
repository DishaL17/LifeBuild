import React from 'react';

export default function CharacterCard({ character }) {
  const {
    name = 'Player One',
    characterClass = 'Warrior',
    level = 1,
    avatarUrl,
    gold = 100,
    completedQuestsCount = 0,
    title = 'Novice Adventurer',
  } = character || {};

  return (
    <div className="character-card">
      <div className="character-avatar-wrapper">
        {avatarUrl ? (
          <img src={avatarUrl} alt={name} className="character-avatar" />
        ) : (
          <div className="character-avatar-placeholder">⚔️</div>
        )}
        <span className="character-level-badge">Lv. {level}</span>
      </div>

      <div className="character-info">
        <h3 className="character-name">{name}</h3>
        <p className="character-title">{title}</p>
        <span className="character-class-pill">{characterClass}</span>
      </div>

      <div className="character-stats-summary">
        <div className="stat-item">
          <span className="stat-label">🪙 Gold</span>
          <span className="stat-value">{gold}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">📜 Quests</span>
          <span className="stat-value">{completedQuestsCount}</span>
        </div>
      </div>
    </div>
  );
}
