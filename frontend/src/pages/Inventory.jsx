import React from 'react';
import { Link } from 'react-router-dom';
import './Inventory.css';

export default function Inventory() {
  const items = [
    { id: 1, name: 'Rare Candy', desc: 'Instantly grants +100 XP', icon: '🍬', qty: 2 },
    { id: 2, name: 'Hyper Potion', desc: 'Restores +50 HP Stamina', icon: '🧪', qty: 5 },
    { id: 3, name: 'Fire Stone', desc: 'Boosts STR & INT stats', icon: '🔥', qty: 1 },
    { id: 4, name: 'Master Ball', desc: 'Legendary Trainer status item', icon: '🟣', qty: 1 },
  ];

  return (
    <div className="inventory-container">
      <div className="inventory-content">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 style={{ color: '#facc15', margin: 0 }}>🎒 TRAINER BACKPACK</h1>
          <Link to="/dashboard" style={{ color: '#ef4444', fontWeight: 'bold', textDecoration: 'none' }}>⬅️ Back to Dashboard</Link>
        </div>

        <p style={{ color: '#a1a1aa' }}>Items, potions, and stones purchased from Pokémart.</p>

        <div className="inventory-grid">
          {items.map((item) => (
            <div key={item.id} className="item-card">
              <div style={{ fontSize: '2.5rem', marginBottom: '0.4rem' }}>{item.icon}</div>
              <h4 style={{ color: '#ffffff', margin: '0.2rem 0' }}>{item.name}</h4>
              <p style={{ color: '#a1a1aa', fontSize: '0.75rem' }}>{item.desc}</p>
              <span style={{ color: '#facc15', fontWeight: 'bold', fontSize: '0.8rem' }}>Quantity: x{item.qty}</span>
              <button
                onClick={() => alert(`Used ${item.name}!`)}
                style={{ width: '100%', marginTop: '0.75rem', background: '#22c55e', border: 'none', color: '#fff', fontWeight: 'bold', padding: '0.5rem', borderRadius: '8px', cursor: 'pointer' }}
              >
                USE ITEM
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}