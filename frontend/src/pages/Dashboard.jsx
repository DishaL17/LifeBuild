import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { soundEngine } from '../utils/soundeffects';
import './Dashboard.css';

const STARTER_EVOLUTIONS = {
  charmander: [
    { id: 'charmander', name: 'Charmander', stage: 'Basic', minLevel: 1, type: 'Fire', spriteUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/4.gif' },
    { id: 'charmeleon', name: 'Charmeleon', stage: 'Stage 1', minLevel: 5, type: 'Fire', spriteUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/5.gif' },
    { id: 'charizard', name: 'Charizard', stage: 'Stage 2', minLevel: 10, type: 'Fire/Flying', spriteUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/6.gif' },
  ],
  pikachu: [
    { id: 'pikachu', name: 'Pikachu', stage: 'Basic', minLevel: 1, type: 'Electric', spriteUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/25.gif' },
    { id: 'raichu', name: 'Raichu', stage: 'Stage 1', minLevel: 5, type: 'Electric', spriteUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/26.gif' },
  ],
  squirtle: [
    { id: 'squirtle', name: 'Squirtle', stage: 'Basic', minLevel: 1, type: 'Water', spriteUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/7.gif' },
    { id: 'blastoise', name: 'Blastoise', stage: 'Stage 2', minLevel: 10, type: 'Water', spriteUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/9.gif' },
  ],
  bulbasaur: [
    { id: 'bulbasaur', name: 'Bulbasaur', stage: 'Basic', minLevel: 1, type: 'Grass', spriteUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/1.gif' },
    { id: 'venusaur', name: 'Venusaur', stage: 'Stage 2', minLevel: 10, type: 'Grass/Poison', spriteUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/3.gif' },
  ],
};

const GYM_BADGES = [
  { id: 'boulder', name: 'Boulder Badge', description: 'Awarded at Trainer Level 5. Solid as rock!', icon: '🪨', minLevel: 5 },
  { id: 'cascade', name: 'Cascade Badge', description: 'Unlocked at 30 Attack (STR) points.', icon: '💧', minStr: 30 },
  { id: 'thunder', name: 'Thunder Badge', description: 'Maintain a 5-day active streak!', icon: '⚡', minStreak: 5 },
  { id: 'rainbow', name: 'Rainbow Badge', description: 'Unlocked at 30 Sp. Atk (INT) points.', icon: '🌈', minInt: 30 },
  { id: 'soul', name: 'Soul Badge', description: 'Unlocked at 30 Sp. Def (WIS) points.', icon: '🔮', minWis: 30 },
  { id: 'marsh', name: 'Marsh Badge', description: 'Awarded at Trainer Level 15.', icon: '🌀', minLevel: 15 },
  { id: 'volcano', name: 'Volcano Badge', description: 'Unlocked at 30 Speed (AGI) points.', icon: '🌋', minAgi: 30 },
  { id: 'earth', name: 'Earth Badge', description: 'Awarded at Trainer Level 25. Pokémon Master!', icon: '🌍', minLevel: 25 },
];

export default function Dashboard() {
  const [isMuted, setIsMuted] = useState(false);

  const [user, setUser] = useState({
    username: 'Ash Ketchum',
    avatar: '🧢',
    level: 1,
    xp: 45,
    gold: 150,
    streak: 5,
    companionMon: 'charmander',
    str: 15,
    int: 20,
    wis: 12,
    agi: 14,
    hp: 100,
  });

  const [quests, setQuests] = useState([
    { id: 1, title: 'Complete LeetCode Daily Challenge', attribute: 'int', difficulty: 'Medium', xp: 60, gold: 35, completed: false },
    { id: 2, title: 'Push Day Workout at Gym', attribute: 'str', difficulty: 'Hard', xp: 120, gold: 75, completed: false },
    { id: 3, title: 'Read 20 pages of System Design', attribute: 'wis', difficulty: 'Easy', xp: 25, gold: 15, completed: true },
    { id: 4, title: 'Drink 3L Water & 8 Hours Sleep', attribute: 'hp', difficulty: 'Easy', xp: 25, gold: 15, completed: false },
  ]);

  const [activeFilter, setActiveFilter] = useState('all');
  const [toast, setToast] = useState(null);
  const [isChangingStarter, setIsChangingStarter] = useState(false);
  const [showLevelUpModal, setShowLevelUpModal] = useState(false);
  const [evolutionData, setEvolutionData] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const [newQuest, setNewQuest] = useState({ title: '', attribute: 'int', difficulty: 'Easy' });

  const xpNeeded = Math.floor(100 * Math.pow(user.level, 1.5));
  const xpPercent = Math.min(100, Math.round((user.xp / xpNeeded) * 100));

  const getActiveMon = (monKey, level) => {
    const chain = STARTER_EVOLUTIONS[monKey] || STARTER_EVOLUTIONS.charmander;
    let active = chain[0];
    for (const form of chain) {
      if (level >= form.minLevel) active = form;
    }
    return active;
  };

  const activeMon = getActiveMon(user.companionMon, user.level);

  const toggleSound = () => {
    const muted = soundEngine.toggleMute();
    setIsMuted(muted);
  };

  const triggerToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  // Complete / Uncheck Quest Handler
  const handleToggleQuest = (id) => {
    setQuests((prev) =>
      prev.map((q) => {
        if (q.id === id) {
          const isCompleting = !q.completed;

          if (isCompleting) {
            // CHECKING TASK: ADD XP, GOLD & STATS
            soundEngine.playQuestComplete();

            let newXp = user.xp + q.xp;
            let newGold = user.gold + q.gold;
            let newLevel = user.level;
            let currentXpNeeded = Math.floor(100 * Math.pow(newLevel, 1.5));

            const updatedStats = { ...user };
            if (q.attribute === 'str') updatedStats.str += 2;
            if (q.attribute === 'int') updatedStats.int += 2;
            if (q.attribute === 'wis') updatedStats.wis += 2;
            if (q.attribute === 'hp') updatedStats.hp += 5;

            // Level Up Check
            if (newXp >= currentXpNeeded) {
              newLevel += 1;
              newXp = newXp - currentXpNeeded;

              const prevMon = getActiveMon(user.companionMon, user.level);
              const nextMon = getActiveMon(user.companionMon, newLevel);

              if (prevMon.id !== nextMon.id) {
                setEvolutionData({ prev: prevMon, next: nextMon });
                soundEngine.playEvolutionFanfare();
              } else {
                soundEngine.playLevelUp();
              }

              setShowLevelUpModal(true);
            }

            setUser({
              ...updatedStats,
              level: newLevel,
              xp: newXp,
              gold: newGold,
            });

            triggerToast(`⚡ +${q.xp} XP & 💰 +${q.gold} PokéCoins Earned!`);
          } else {
            // UNCHECKING TASK: SUBTRACT XP, GOLD & STATS
            soundEngine.playClick();

            let newXp = Math.max(0, user.xp - q.xp);
            let newGold = Math.max(0, user.gold - q.gold);

            const updatedStats = { ...user };
            if (q.attribute === 'str') updatedStats.str = Math.max(10, updatedStats.str - 2);
            if (q.attribute === 'int') updatedStats.int = Math.max(10, updatedStats.int - 2);
            if (q.attribute === 'wis') updatedStats.wis = Math.max(10, updatedStats.wis - 2);
            if (q.attribute === 'hp') updatedStats.hp = Math.max(50, updatedStats.hp - 5);

            setUser({
              ...updatedStats,
              xp: newXp,
              gold: newGold,
            });

            triggerToast(`⚡ -${q.xp} XP & 💰 -${q.gold} PokéCoins`);
          }

          return { ...q, completed: isCompleting };
        }
        return q;
      })
    );
  };

  const handleAddQuest = (e) => {
    e.preventDefault();
    if (!newQuest.title) return;

    let xpReward = 25; let goldReward = 15;
    if (newQuest.difficulty === 'Medium') { xpReward = 60; goldReward = 35; }
    if (newQuest.difficulty === 'Hard') { xpReward = 120; goldReward = 75; }

    const questObj = {
      id: Date.now(),
      title: newQuest.title,
      attribute: newQuest.attribute,
      difficulty: newQuest.difficulty,
      xp: xpReward,
      gold: goldReward,
      completed: false,
    };

    setQuests([questObj, ...quests]);
    setActiveFilter('all'); // 👈 Automatically switches tab to ALL QUESTS so you see your new quest instantly!
    setNewQuest({ title: '', attribute: 'int', difficulty: 'Easy' });
    setShowAddModal(false);
    triggerToast('📜 New Quest added!');
  };
  const handleDeleteQuest = (id) => {       
  soundEngine.playClick();
  setQuests((prev) => prev.filter((q) => q.id !== id));
  triggerToast('🗑️ Quest deleted!');
};

  const handleSelectStarter = (starterKey) => {
    soundEngine.playClick();
    setUser({ ...user, companionMon: starterKey });
    setIsChangingStarter(false);
    triggerToast(`Partner switched to ${STARTER_EVOLUTIONS[starterKey][0].name}!`);
  };

  const filteredQuests = quests.filter((q) => activeFilter === 'all' || q.attribute === activeFilter);

  return (
    <div className="dashboard-container">
      <div className="dashboard-content">

        {/* Pokédex Main Frame */}
        <div className="pokedex-card-frame">
          <div className="pokedex-card-header">
            <div className="big-lens" />
            <div className="led-group">
              <div className="led red" />
              <div className="led yellow" />
              <div className="led green" />
            </div>
            <button onClick={toggleSound} className="mute-btn">
              {isMuted ? '🔇 SFX OFF' : '🔊 SFX ON'}
            </button>
          </div>

          <div className="pokedex-card-body">
            
            {/* Pokémon Showcase */}
            <div className="pokemon-showcase-grid">
              
              <div className="pokemon-display-box">
                <button onClick={() => setIsChangingStarter(true)} className="switch-partner-btn">
                  🔄 Switch Partner
                </button>
                <img src={activeMon.spriteUrl} alt={activeMon.name} className="pokemon-gif-avatar" />
                <h3 style={{ color: '#facc15', margin: '0.3rem 0 0.1rem 0' }}>{activeMon.name}</h3>
                <span style={{ fontSize: '0.75rem', color: '#a1a1aa' }}>Stage: {activeMon.stage} ({activeMon.type})</span>
              </div>

              {/* Trainer Meta & Attributes */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <span style={{ fontSize: '0.7rem', color: '#71717a', textTransform: 'uppercase' }}>Pokémon Trainer License</span>
                    <h2 style={{ color: '#ffffff', margin: 0, fontSize: '1.4rem' }}>{user.avatar} {user.username}</h2>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: '0.75rem', color: '#f97316', fontWeight: 'bold' }}>🔥 {user.streak} Day Streak</span>
                    <div style={{ color: '#facc15', fontWeight: 'bold', fontSize: '0.9rem' }}>💰 {user.gold} PokéCoins</div>
                  </div>
                </div>

                {/* XP Progress Bar */}
                <div className="xp-section">
                  <div className="xp-text">
                    <span style={{ color: '#facc15' }}>LEVEL {user.level} TRAINER</span>
                    <span>{user.xp} / {xpNeeded} XP ({xpPercent}%)</span>
                  </div>
                  <div className="xp-track">
                    <div className="xp-fill" style={{ width: `${xpPercent}%` }} />
                  </div>
                </div>

                {/* Trainer Attribute Stats */}
                <div className="stats-attribute-grid">
                  <div className="stat-card-item str">🥊 STR: {user.str}</div>
                  <div className="stat-card-item int">⚡ INT: {user.int}</div>
                  <div className="stat-card-item wis">🔮 WIS: {user.wis}</div>
                  <div className="stat-card-item agi">💨 AGI: {user.agi}</div>
                  <div className="stat-card-item hp">❤️ HP: {user.hp}</div>
                </div>
              </div>

            </div>

            <div style={{ textAlign: 'right' }}>
              <Link to="/shop" className="shop-link-btn">
                <span>🛒 ENTER POKÉMART SHOP</span>
              </Link>
            </div>

          </div>
        </div>

        {/* Quest Log Header & Filters */}
        <div className="board-header">
          <h3 className="board-title">📜 DAILY QUEST LOG</h3>
          <div className="filter-group">
            {['all', 'str', 'int', 'wis', 'hp'].map((attr) => (
              <button
                key={attr}
                onClick={() => setActiveFilter(attr)}
                className={`filter-btn ${activeFilter === attr ? 'active' : ''}`}
              >
                {attr === 'all' ? 'ALL QUESTS' : attr.toUpperCase()}
              </button>
            ))}
            <button onClick={() => setShowAddModal(true)} className="btn-add-quest">
              <span>+ ADD QUEST</span>
            </button>
          </div>
        </div>

        {/* Quest List with Styled Cards */}
        <div className="quest-list">
          {filteredQuests.map((q) => (
            <div key={q.id} className={`quest-card ${q.completed ? 'completed' : ''}`}>
              <div className="quest-left">
                <button onClick={() => handleToggleQuest(q.id)} className={`quest-checkbox ${q.completed ? 'checked' : ''}`}>
                  {q.completed ? '✓' : ''}
                </button>
                <div className="quest-details">
                  <span className="quest-title-text">{q.title}</span>
                  <div className="quest-badges">
                    <span className={`attr-tag ${q.attribute}`}>{q.attribute.toUpperCase()}</span>
                  </div>
                </div>
              </div>

              <div className="reward-right-group">
                <div className="reward-info">
                  <span className="reward-xp">+{q.xp} XP</span>
                  <span className="reward-gold">+{q.gold} 💰</span>
                </div>
                <button onClick={() => handleDeleteQuest(q.id)} className="btn-delete-quest">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Gym Badges Showcase Section */}
        <div className="badges-container">
          <h3 style={{ color: '#facc15', margin: 0 }}>🏆 Gym Badge Showcase</h3>
          <div className="badge-grid">
            {GYM_BADGES.map((b) => {
              const isUnlocked =
                (b.minLevel && user.level >= b.minLevel) ||
                (b.minStr && user.str >= b.minStr) ||
                (b.minStreak && user.streak >= b.minStreak) ||
                (b.minInt && user.int >= b.minInt) ||
                (b.minWis && user.wis >= b.minWis);

              return (
                <div key={b.id} className={`badge-item ${isUnlocked ? 'unlocked' : 'locked'}`}>
                  <div className="badge-icon">{b.icon}</div>
                  <h4 style={{ margin: '0.2rem 0', color: '#facc15', fontSize: '0.85rem' }}>{b.name}</h4>
                  <p style={{ margin: 0, fontSize: '0.7rem', color: '#a1a1aa' }}>{b.description}</p>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Floating Toast Notification */}
      {toast && <div className="toast-popup">{toast}</div>}

      {/* Evolution / Level Up Modal */}
      {showLevelUpModal && (
        <div className="modal-backdrop">
          <div className="starter-modal-card" style={{ textAlign: 'center' }}>
            {evolutionData ? (
              <>
                <span style={{ fontSize: '1rem', color: '#38bdf8', fontWeight: 'bold' }}>WHAT? YOUR POKÉMON IS EVOLVING!</span>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', margin: '1rem 0' }}>
                  <img src={evolutionData.prev.spriteUrl} alt={evolutionData.prev.name} style={{ width: '80px' }} />
                  <span style={{ fontSize: '1.5rem' }}>⚡ ➡️ ⚡</span>
                  <img src={evolutionData.next.spriteUrl} alt={evolutionData.next.name} style={{ width: '90px' }} />
                </div>
                <h2 style={{ color: '#facc15', margin: '0.5rem 0' }}>{evolutionData.next.name.toUpperCase()}!</h2>
                <p style={{ color: '#e4e4e7' }}>Congratulations! Your companion evolved at Level {user.level}!</p>
              </>
            ) : (
              <>
                <span style={{ fontSize: '3rem' }}>🎉 ⚡ 🏆</span>
                <h2 style={{ color: '#facc15', margin: '0.5rem 0' }}>LEVEL UP!</h2>
                <p style={{ color: '#e4e4e7' }}>You reached <strong>Level {user.level} Trainer</strong>!</p>
              </>
            )}
            <button
              onClick={() => { setShowLevelUpModal(false); setEvolutionData(null); }}
              className="btn-add-quest"
              style={{ margin: '1.5rem auto 0', padding: '0.8rem 2rem' }}
            >
              CONTINUE QUESTING 🚀
            </button>
          </div>
        </div>
      )}

      {/* Switch Partner Pokémon Modal */}
      {isChangingStarter && (
        <div className="modal-backdrop">
          <div className="starter-modal-card">
            <h3 style={{ color: '#facc15', margin: 0, textAlign: 'center' }}>Choose Your Partner Pokémon</h3>
            <p style={{ color: '#a1a1aa', fontSize: '0.8rem', textAlign: 'center', margin: '0.4rem 0' }}>
              Select a starter Pokémon to accompany you on your productivity journey!
            </p>

            <div className="starter-selection-grid">
              {Object.keys(STARTER_EVOLUTIONS).map((key) => {
                const starter = STARTER_EVOLUTIONS[key][0];
                const isCurrent = user.companionMon === key;
                return (
                  <div
                    key={key}
                    onClick={() => handleSelectStarter(key)}
                    className={`starter-choice-btn ${isCurrent ? 'active' : ''}`}
                  >
                    <img src={starter.spriteUrl} alt={starter.name} style={{ width: '64px', height: '64px' }} />
                    <span style={{ color: '#facc15', fontWeight: 'bold', fontSize: '0.9rem', marginTop: '0.4rem' }}>{starter.name}</span>
                    <span style={{ color: '#a1a1aa', fontSize: '0.75rem' }}>{starter.type}</span>
                  </div>
                );
              })}
            </div>

            <button
              onClick={() => setIsChangingStarter(false)}
              style={{ width: '100%', background: '#27272a', border: 'none', color: '#ffffff', padding: '0.6rem', borderRadius: '12px', cursor: 'pointer' }}
            >
              CLOSE
            </button>
          </div>
        </div>
      )}

      {/* Add New Quest Modal */}
      {showAddModal && (
        <div className="modal-backdrop">
          <div className="starter-modal-card">
            <h3 style={{ color: '#facc15', margin: '0 0 1rem 0' }}>➕ ADD NEW QUEST</h3>
            <form onSubmit={handleAddQuest} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', color: '#a1a1aa', fontSize: '0.75rem', fontWeight: 'bold', marginBottom: '0.4rem' }}>Quest Title</label>
                <input
                  type="text"
                  value={newQuest.title}
                  onChange={(e) => setNewQuest({ ...newQuest, title: e.target.value })}
                  placeholder="e.g. Read 15 pages of documentation"
                  style={{ width: '100%', padding: '0.75rem', background: '#09090b', border: '1px solid #27272a', borderRadius: '10px', color: '#fff', boxSizing: 'border-box' }}
                  required
                />
              </div>

              <div>
                <label style={{ display: 'block', color: '#a1a1aa', fontSize: '0.75rem', fontWeight: 'bold', marginBottom: '0.4rem' }}>Attribute Category</label>
                <select
                  value={newQuest.attribute}
                  onChange={(e) => setNewQuest({ ...newQuest, attribute: e.target.value })}
                  style={{ width: '100%', padding: '0.75rem', background: '#09090b', border: '1px solid #27272a', borderRadius: '10px', color: '#fff', boxSizing: 'border-box' }}
                >
                  <option value="int">⚡ Intellect (Coding / Study)</option>
                  <option value="str">🥊 Strength (Gym / Workout)</option>
                  <option value="wis">🔮 Wisdom (Reading / Focus)</option>
                  <option value="hp">❤️ HP / Stamina (Wellness / Sleep)</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', color: '#a1a1aa', fontSize: '0.75rem', fontWeight: 'bold', marginBottom: '0.4rem' }}>Difficulty Level</label>
                <select
                  value={newQuest.difficulty}
                  onChange={(e) => setNewQuest({ ...newQuest, difficulty: e.target.value })}
                  style={{ width: '100%', padding: '0.75rem', background: '#09090b', border: '1px solid #27272a', borderRadius: '10px', color: '#fff', boxSizing: 'border-box' }}
                >
                  <option value="Easy">Easy (+25 XP / +15 PokéCoins)</option>
                  <option value="Medium">Medium (+60 XP / +35 PokéCoins)</option>
                  <option value="Hard">Hard (+120 XP / +75 PokéCoins)</option>
                </select>
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '1rem' }}>
                <button type="submit" className="btn-add-quest" style={{ flex: 1, justifyContent: 'center' }}>
                  CREATE QUEST
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  style={{ background: '#27272a', border: 'none', color: '#a1a1aa', padding: '0.8rem', borderRadius: '12px', cursor: 'pointer' }}
                >
                  CANCEL
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}