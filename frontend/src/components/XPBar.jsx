import React from 'react';
import { calculateLevel } from '../utils/helpers';

export default function XPBar({ currentXP = 0, level: explicitLevel, nextLevelXP: explicitNext }) {
  const calculated = calculateLevel(currentXP);
  const level = explicitLevel || calculated.level;
  const xpCurrent = calculated.xpCurrent;
  const xpNeeded = explicitNext || calculated.xpNeeded;
  const progressPercent = calculated.progressPercent;

  return (
    <div className="xp-bar-container">
      <div className="xp-header">
        <div className="xp-level-badge">
          <span className="level-label">LEVEL</span>
          <span className="level-number">{level}</span>
        </div>
        <div className="xp-text">
          <span>{xpCurrent} / {xpNeeded} XP</span>
          <span className="xp-percent">({progressPercent}%)</span>
        </div>
      </div>

      <div className="xp-track">
        <div
          className="xp-fill"
          style={{ width: `${progressPercent}%` }}
        />
      </div>
    </div>
  );
}
