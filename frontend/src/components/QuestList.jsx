import { useState } from 'react';
import QuestCard from './QuestCard';

export default function QuestList({ quests = [], onComplete, onDelete }) {
  const [filter, setFilter] = useState('all');

  const filteredQuests = quests.filter((q) => {
    if (filter === 'active') return !q.completed;
    if (filter === 'completed') return q.completed;
    return true;
  });

  return (
    <div className="quest-list-container">
      <div className="quest-list-header">
        <h3>Quests & Tasks</h3>
        <div className="quest-filters">
          {['all', 'active', 'completed'].map((f) => (
            <button
              key={f}
              className={`filter-btn ${filter === f ? 'active' : ''}`}
              onClick={() => setFilter(f)}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="quest-list">
        {filteredQuests.length === 0 ? (
          <p className="no-quests-message">No quests found in this category.</p>
        ) : (
          filteredQuests.map((quest) => (
            <QuestCard
              key={quest.id || quest._id}
              quest={quest}
              onComplete={onComplete}
              onDelete={onDelete}
            />
          ))
        )}
      </div>
    </div>
  );
}
