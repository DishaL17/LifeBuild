import React from 'react';

export default function LevelUpModal({ isOpen, newLevel, rewards = [], onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content level-up-modal">
        <div className="level-up-badge">🌟 LEVEL UP! 🌟</div>
        <h2 className="level-up-title">Congratulations Adventurer!</h2>
        <p className="level-up-subtitle">
          You have ascended to <strong>Level {newLevel}</strong>!
        </p>

        {rewards.length > 0 && (
          <div className="level-up-rewards">
            <h4>Rewards Unlocked:</h4>
            <ul>
              {rewards.map((reward, index) => (
                <li key={index}>✨ {reward}</li>
              ))}
            </ul>
          </div>
        )}

        <button className="btn-primary level-up-btn" onClick={onClose}>
          Claim & Continue
        </button>
      </div>
    </div>
  );
}
