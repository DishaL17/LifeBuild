import { useState } from 'react';

const ACHIEVEMENTS_DATA = [
  {
    id: 'first_quest',
    title: 'First Step',
    description: 'Complete your first quest in the realm.',
    icon: '🌱',
    unlocked: true,
    unlockedAt: '2026-08-01',
    category: 'Quests',
  },
  {
    id: 'streak_7',
    title: 'Week of Resolve',
    description: 'Maintain a 7-day completion streak.',
    icon: '🔥',
    unlocked: false,
    progress: 5,
    maxProgress: 7,
    category: 'Streaks',
  },
  {
    id: 'lvl_10',
    title: 'Veteran Pathfinder',
    description: 'Ascend to character Level 10.',
    icon: '⭐',
    unlocked: false,
    progress: 3,
    maxProgress: 10,
    category: 'Progression',
  },
  {
    id: 'quests_50',
    title: 'Centurion of Deeds',
    description: 'Complete 50 unique quests.',
    icon: '📜',
    unlocked: false,
    progress: 14,
    maxProgress: 50,
    category: 'Quests',
  },
  {
    id: 'gold_1000',
    title: 'Dragon Hoard',
    description: 'Accumulate 1,000 gold pieces.',
    icon: '🪙',
    unlocked: false,
    progress: 240,
    maxProgress: 1000,
    category: 'Wealth',
  },
];

export default function Achievements() {
  const [filter, setFilter] = useState('All');

  const categories = ['All', 'Quests', 'Streaks', 'Progression', 'Wealth'];

  const filtered = ACHIEVEMENTS_DATA.filter((a) => {
    if (filter === 'All') return true;
    return a.category === filter;
  });

  return (
    <div className="achievements-page">
      <div className="achievements-header">
        <h2>Trophies & Milestones</h2>
        <p>Celebrate your real-world achievements transformed into legendary feats.</p>

        <div className="filter-chips">
          {categories.map((c) => (
            <button
              key={c}
              className={`filter-chip ${filter === c ? 'active' : ''}`}
              onClick={() => setFilter(c)}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="achievements-grid">
        {filtered.map((item) => (
          <div
            key={item.id}
            className={`achievement-card ${item.unlocked ? 'unlocked' : 'locked'}`}
          >
            <div className="achievement-icon">{item.icon}</div>
            <div className="achievement-content">
              <h4>{item.title}</h4>
              <p>{item.description}</p>
              {!item.unlocked && item.maxProgress && (
                <div className="achievement-progress-bar">
                  <div
                    className="progress-fill"
                    style={{
                      width: `${Math.min(100, Math.round((item.progress / item.maxProgress) * 100))}%`,
                    }}
                  />
                  <small>
                    {item.progress} / {item.maxProgress}
                  </small>
                </div>
              )}
              {item.unlocked && (
                <span className="unlocked-tag">✓ Unlocked {item.unlockedAt}</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
