import { useState } from 'react';
import XPBar from '../components/XPBar';
import CharacterCard from '../components/CharacterCard';
import StatCard from '../components/StatCard';
import StreakCard from '../components/StreakCard';
import QuestList from '../components/QuestList';
import AddQuest from '../components/AddQuest';
import LevelUpModal from '../components/LevelUpModal';

const INITIAL_QUESTS = [
  {
    id: '1',
    title: 'Morning Workout & Stretching',
    description: '30 minutes of cardiovascular or strength exercise.',
    xp: 50,
    category: 'Fitness',
    difficulty: 'Medium',
    completed: false,
  },
  {
    id: '2',
    title: 'Read 20 Pages',
    description: 'Read a non-fiction or educational book chapter.',
    xp: 35,
    category: 'Knowledge',
    difficulty: 'Easy',
    completed: false,
  },
  {
    id: '3',
    title: 'Meditate for 10 Minutes',
    description: 'Focus on breathing and mental clarity.',
    xp: 25,
    category: 'Mindfulness',
    difficulty: 'Easy',
    completed: true,
  },
];

export default function Dashboard() {
  const [character, setCharacter] = useState({
    name: 'Valerius',
    characterClass: 'Warrior',
    level: 3,
    xp: 320,
    gold: 240,
    completedQuestsCount: 14,
    title: 'Steadfast Guardian',
  });

  const [quests, setQuests] = useState(INITIAL_QUESTS);
  const [levelUpState, setLevelUpState] = useState({ isOpen: false, level: 3, rewards: [] });

  const handleCompleteQuest = (questId) => {
    setQuests((prev) =>
      prev.map((q) => {
        if (q.id === questId && !q.completed) {
          const newXP = character.xp + q.xp;
          const newGold = character.gold + Math.round(q.xp / 2);
          const newCompletedCount = character.completedQuestsCount + 1;

          // Check level up (simplified: level * 150)
          const nextLevelXP = character.level * 150;
          if (newXP >= nextLevelXP) {
            const nextLvl = character.level + 1;
            setCharacter((c) => ({
              ...c,
              xp: newXP,
              gold: newGold,
              level: nextLvl,
              completedQuestsCount: newCompletedCount,
            }));
            setLevelUpState({
              isOpen: true,
              level: nextLvl,
              rewards: ['+1 Stat Point', '+50 Bonus Gold', 'New Class Skill Unlocked'],
            });
          } else {
            setCharacter((c) => ({
              ...c,
              xp: newXP,
              gold: newGold,
              completedQuestsCount: newCompletedCount,
            }));
          }

          return { ...q, completed: true };
        }
        return q;
      })
    );
  };

  const handleDeleteQuest = (questId) => {
    setQuests((prev) => prev.filter((q) => q.id !== questId));
  };

  const handleAddQuest = (newQuest) => {
    setQuests((prev) => [newQuest, ...prev]);
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-grid">
        <div className="dashboard-sidebar-column">
          <CharacterCard character={character} />
          <StreakCard currentStreak={5} longestStreak={14} />
        </div>

        <div className="dashboard-main-column">
          <div className="dashboard-header-widget">
            <h2>Player Progress</h2>
            <XPBar currentXP={character.xp} />
          </div>

          <div className="stats-row">
            <StatCard label="Strength" value={18} icon="💪" color="#ef4444" description="Fitness & Power" />
            <StatCard label="Intelligence" value={14} icon="🧠" color="#3b82f6" description="Reading & Study" />
            <StatCard label="Discipline" value={21} icon="🎯" color="#10b981" description="Habits & Focus" />
            <StatCard label="Vitality" value={16} icon="❤️" color="#f59e0b" description="Health & Rest" />
          </div>

          <div className="dashboard-quests-section">
            <div className="quests-header-row">
              <AddQuest onAddQuest={handleAddQuest} />
            </div>
            <QuestList
              quests={quests}
              onComplete={handleCompleteQuest}
              onDelete={handleDeleteQuest}
            />
          </div>
        </div>
      </div>

      <LevelUpModal
        isOpen={levelUpState.isOpen}
        newLevel={levelUpState.level}
        rewards={levelUpState.rewards}
        onClose={() => setLevelUpState({ isOpen: false, level: 3, rewards: [] })}
      />
    </div>
  );
}
