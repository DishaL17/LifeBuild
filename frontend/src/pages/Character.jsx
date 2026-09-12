import { useState } from 'react';
import StatCard from '../components/StatCard';
import XPBar from '../components/XPBar';

export default function Character() {
  const [character, setCharacter] = useState({
    name: 'Valerius',
    title: 'Steadfast Guardian',
    characterClass: 'Warrior',
    level: 3,
    xp: 320,
    gold: 240,
    statPoints: 3,
    stats: {
      strength: 18,
      intelligence: 14,
      discipline: 21,
      vitality: 16,
      agility: 12,
    },
    equipment: {
      weapon: 'Iron Shortsword (+2 STR)',
      armor: 'Leather Jerkin (+1 VIT)',
      helm: 'Traveler Hood',
      accessory: 'Ring of Discipline (+3 DIS)',
    },
  });

  const handleAllocateStat = (statName) => {
    if (character.statPoints <= 0) return;
    setCharacter((prev) => ({
      ...prev,
      statPoints: prev.statPoints - 1,
      stats: {
        ...prev.stats,
        [statName]: prev.stats[statName] + 1,
      },
    }));
  };

  return (
    <div className="character-page">
      <div className="character-sheet-header">
        <div className="character-profile">
          <div className="character-avatar-large">🛡️</div>
          <div>
            <h2>{character.name}</h2>
            <p className="character-subtitle">{character.title} • {character.characterClass}</p>
            <span className="badge">Level {character.level}</span>
          </div>
        </div>

        <div className="character-xp-overview">
          <XPBar currentXP={character.xp} />
        </div>
      </div>

      <div className="character-sections-grid">
        <div className="character-stats-panel">
          <div className="panel-header">
            <h3>Attributes</h3>
            {character.statPoints > 0 && (
              <span className="unallocated-points">
                {character.statPoints} Points Available!
              </span>
            )}
          </div>

          <div className="stat-allocation-list">
            {Object.entries(character.stats).map(([stat, val]) => (
              <div key={stat} className="stat-allocation-row">
                <span className="stat-name">{stat.toUpperCase()}</span>
                <span className="stat-number">{val}</span>
                {character.statPoints > 0 && (
                  <button
                    className="btn-plus"
                    onClick={() => handleAllocateStat(stat)}
                    title="Add 1 Point"
                  >
                    +
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="character-equipment-panel">
          <div className="panel-header">
            <h3>Equipped Gear</h3>
          </div>
          <div className="equipment-slots">
            {Object.entries(character.equipment).map(([slot, item]) => (
              <div key={slot} className="equipment-slot">
                <span className="slot-type">{slot.toUpperCase()}</span>
                <span className="slot-item">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
