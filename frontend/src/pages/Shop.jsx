import React from 'react';
import { Link } from 'react-router-dom';
import './Shop.css';

// Exact Catalog Items from PokeLifeRPG SHOP_ITEMS
export default function Shop() {
  const shopItems = [
    { id: 'rare_candy', name: 'Rare Candy', price: 100, icon: '🍬', desc: 'Instantly grants +100 XP to your Trainer!' },
    { id: 'hyper_potion', name: 'Hyper Potion', price: 50, icon: '🧪', desc: 'Boosts Stamina/HP stat by +50.' },
    { id: 'fire_stone', name: 'Fire Stone', price: 250, icon: '🔥', desc: 'Grants +10 Strength & +10 Intellect.' },
    { id: 'thunder_stone', name: 'Thunder Stone', price: 250, icon: '⚡', desc: 'Grants +10 Agility & +100 PokéCoins.' },
    { id: 'master_ball', name: 'Master Ball', price: 500, icon: '🟣', desc: 'Unlocks Master Trainer status!' },
  ];

  return (
    <div className="shop-container">
      <div className="shop-content">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 style={{ color: '#facc15', margin: 0 }}>🛒 POKÉMART CATALOG</h1>
          <Link to="/dashboard" style={{ color: '#ef4444', fontWeight: 'bold', textDecoration: 'none' }}>⬅️ Back to Dashboard</Link>
        </div>

        <p style={{ color: '#a1a1aa' }}>Spend your quest-earned PokéCoins to buy rare items, potions, and elemental stones!</p>

        <div className="shop-grid">
          {shopItems.map((item) => (
            <div key={item.id} className="shop-card">
              <div className="shop-avatar-icon">{item.icon}</div>
              <h4 style={{ margin: '0.2rem 0', color: '#ffffff' }}>{item.name}</h4>
              <p style={{ fontSize: '0.75rem', color: '#a1a1aa', margin: 0 }}>{item.desc}</p>
              <span style={{ color: '#facc15', fontWeight: 'bold' }}>💰 {item.price} PokéCoins</span>
              <button className="btn-buy" onClick={() => alert(`Purchased ${item.name}!`)}>
                BUY ITEM
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}