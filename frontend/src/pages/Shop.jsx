import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import './Shop.css';

// Exact Catalog Items from PokeLifeRPG SHOP_ITEMS
const SHOP_ITEMS = [
  { id: 'rare_candy', name: 'Rare Candy', price: 100, icon: '🍬', desc: 'Instantly grants +100 XP to your Trainer!' },
  { id: 'hyper_potion', name: 'Hyper Potion', price: 50, icon: '🧪', desc: 'Boosts Stamina/HP stat by +50.' },
  { id: 'fire_stone', name: 'Fire Stone', price: 250, icon: '🔥', desc: 'Grants +10 Strength & +10 Intellect.' },
  { id: 'thunder_stone', name: 'Thunder Stone', price: 250, icon: '⚡', desc: 'Grants +10 Agility & +100 PokéCoins.' },
  { id: 'master_ball', name: 'Master Ball', price: 500, icon: '🟣', desc: 'Unlocks Master Trainer status!' },
];

export default function Shop() {
  const { user, setUser } = useUser();
  const [popup, setPopup] = useState(null); // { success: bool, item }

  const handleBuy = (item) => {
    if (user.gold < item.price) {
      setPopup({ success: false, item });
      return;
    }

    const updated = { ...user, gold: user.gold - item.price };

    switch (item.id) {
      case 'rare_candy':
        updated.xp += 100;
        break;
      case 'hyper_potion':
        updated.hp += 50;
        break;
      case 'fire_stone':
        updated.str += 10;
        updated.int += 10;
        break;
      case 'thunder_stone':
        updated.agi += 10;
        updated.gold += 100;
        break;
      case 'master_ball':
        updated.isMasterTrainer = true;
        break;
      default:
        break;
    }

    setUser(updated);
    setPopup({ success: true, item });
  };

  const closePopup = () => setPopup(null);

  return (
    <div className="shop-container">
      <div className="shop-content">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
          <h1 style={{ color: '#facc15', margin: 0 }}>🛒 POKÉMART CATALOG</h1>
          <Link to="/dashboard" style={{ color: '#ef4444', fontWeight: 'bold', textDecoration: 'none' }}>⬅️ Back to Dashboard</Link>
        </div>

        <p style={{ color: '#a1a1aa' }}>Spend your quest-earned PokéCoins to buy rare items, potions, and elemental stones!</p>

        {/* PokéCoins Balance Bar */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: '#18181b',
            border: '1px solid #facc15',
            borderRadius: '999px',
            padding: '0.5rem 1.2rem',
            marginBottom: '1rem',
          }}
        >
          <span style={{ fontSize: '1.1rem' }}>💰</span>
          <span style={{ color: '#facc15', fontWeight: 'bold', fontSize: '1.1rem' }}>
            {user.gold} PokéCoins
          </span>
        </div>

        <div className="shop-grid">
          {SHOP_ITEMS.map((item) => {
            const canAfford = user.gold >= item.price;
            return (
              <div key={item.id} className="shop-card">
                <div className="shop-avatar-icon">{item.icon}</div>
                <h4 style={{ margin: '0.2rem 0', color: '#ffffff' }}>{item.name}</h4>
                <p style={{ fontSize: '0.75rem', color: '#a1a1aa', margin: 0 }}>{item.desc}</p>
                <span style={{ color: '#facc15', fontWeight: 'bold' }}>💰 {item.price} PokéCoins</span>
                <button
                  className="btn-buy"
                  onClick={() => handleBuy(item)}
                  style={!canAfford ? { opacity: 0.5, cursor: 'not-allowed' } : undefined}
                >
                  {canAfford ? 'BUY ITEM' : 'NOT ENOUGH COINS'}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Purchase Result Popup */}
      {popup && (
        <div
          onClick={closePopup}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: '#18181b',
              border: `2px solid ${popup.success ? '#facc15' : '#ef4444'}`,
              borderRadius: '18px',
              padding: '2rem',
              maxWidth: '340px',
              width: '90%',
              textAlign: 'center',
              boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
            }}
          >
            <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>
              {popup.success ? popup.item.icon : '❌'}
            </div>
            {popup.success ? (
              <>
                <h2 style={{ color: '#facc15', margin: '0 0 0.5rem 0' }}>Purchase Complete!</h2>
                <p style={{ color: '#e4e4e7', margin: 0 }}>
                  You bought <strong>{popup.item.name}</strong> for{' '}
                  <strong>💰 {popup.item.price}</strong> PokéCoins.
                </p>
                <p style={{ color: '#a1a1aa', fontSize: '0.85rem', marginTop: '0.6rem' }}>
                  {popup.item.desc}
                </p>
              </>
            ) : (
              <>
                <h2 style={{ color: '#ef4444', margin: '0 0 0.5rem 0' }}>Not Enough PokéCoins!</h2>
                <p style={{ color: '#e4e4e7', margin: 0 }}>
                  <strong>{popup.item.name}</strong> costs 💰 {popup.item.price}, but you only have{' '}
                  💰 {user.gold}.
                </p>
                <p style={{ color: '#a1a1aa', fontSize: '0.85rem', marginTop: '0.6rem' }}>
                  Complete more quests to earn coins!
                </p>
              </>
            )}
            <button
              onClick={closePopup}
              style={{
                marginTop: '1.5rem',
                background: popup.success ? '#facc15' : '#27272a',
                color: popup.success ? '#09090b' : '#fff',
                border: 'none',
                borderRadius: '12px',
                padding: '0.7rem 1.6rem',
                fontWeight: 'bold',
                cursor: 'pointer',
              }}
            >
              {popup.success ? 'AWESOME!' : 'GOT IT'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}