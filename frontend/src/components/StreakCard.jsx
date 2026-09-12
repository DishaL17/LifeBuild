import React from 'react';

export default function StreakCard({ currentStreak = 0, longestStreak = 0, lastActiveDate }) {
  const isStreakActive = currentStreak > 0;

  return (
    <div className={`streak-card ${isStreakActive ? 'active' : ''}`}>
      <div className="streak-icon-wrapper">
        <span className="streak-flame">{isStreakActive ? '🔥' : '❄️'}</span>
      </div>

      <div className="streak-content">
        <div className="streak-count-row">
          <span className="streak-number">{currentStreak}</span>
          <span className="streak-unit">Day Streak</span>
        </div>
        <p className="streak-subtext">
          {isStreakActive
            ? 'Keep the flame burning! Complete a quest today.'
            : 'Start a new streak today!'}
        </p>
      </div>

      <div className="streak-footer">
        <span className="streak-record">🏆 Best: {longestStreak} days</span>
      </div>
    </div>
  );
}
