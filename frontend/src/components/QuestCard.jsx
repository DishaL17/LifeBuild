import React from 'react';

export default function QuestCard({ quest, onComplete, onDelete }) {
  if (!quest) return null;

  const {
    id,
    title,
    description,
    xp = 10,
    category = 'General',
    difficulty = 'Easy',
    completed = false,
  } = quest;

  return (
    <div className={`quest-card ${completed ? 'completed' : ''}`}>
      <div className="quest-header">
        <h4 className="quest-title">{title}</h4>
        <span className={`quest-difficulty ${difficulty.toLowerCase()}`}>
          {difficulty}
        </span>
      </div>

      {description && <p className="quest-desc">{description}</p>}

      <div className="quest-footer">
        <div className="quest-meta">
          <span className="quest-tag">{category}</span>
          <span className="quest-xp">+{xp} XP</span>
        </div>

        <div className="quest-actions">
          {!completed && onComplete && (
            <button
              className="btn-complete"
              onClick={() => onComplete(id)}
              title="Complete Quest"
            >
              ✓ Complete
            </button>
          )}
          {onDelete && (
            <button
              className="btn-delete"
              onClick={() => onDelete(id)}
              title="Delete Quest"
            >
              ✕
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
