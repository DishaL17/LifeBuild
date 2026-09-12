import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { soundEngine } from '../utils/soundeffects';
import './Inventory.css';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function Inventory() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [usingId, setUsingId] = useState(null);
  const [toast, setToast] = useState(null);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    fetch(`${API_BASE}/inventory`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.inventory) {
          setItems(data.inventory);
        }
      })
      .catch((err) => console.error('Error fetching inventory:', err))
      .finally(() => setLoading(false));
  }, []);

  const handleUseItem = async (item) => {
    const token = localStorage.getItem('token');
    const itemId = item.itemId || item.id;
    setUsingId(itemId);

    try {
      const res = await fetch(`${API_BASE}/inventory/use`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ itemId }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      if (data.leveledUp) {
        soundEngine.playLevelUp();
      } else {
        soundEngine.playClick();
      }

      showToast(`✨ ${data.message}`);

      // Update inventory locally
      if (data.user && data.user.inventory) {
        setItems(data.user.inventory);
        localStorage.setItem('user', JSON.stringify(data.user));
      } else {
        // Fallback decrement
        setItems((prev) =>
          prev
            .map((i) => (i.itemId === itemId ? { ...i, qty: i.qty - 1 } : i))
            .filter((i) => i.qty > 0)
        );
      }
    } catch (err) {
      showToast('⚠️ ' + (err.message || 'Failed to use item'));
    } finally {
      setUsingId(null);
    }
  };

  return (
    <div className="inventory-container">
      <div className="inventory-content">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 style={{ color: '#facc15', margin: 0 }}>🎒 TRAINER BACKPACK</h1>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <Link to="/shop" style={{ color: '#facc15', fontWeight: 'bold', textDecoration: 'none' }}>🛒 Go to Pokémart</Link>
            <Link to="/dashboard" style={{ color: '#ef4444', fontWeight: 'bold', textDecoration: 'none' }}>⬅️ Back to Dashboard</Link>
          </div>
        </div>

        <p style={{ color: '#a1a1aa' }}>Items, potions, and stones purchased from Pokémart to boost your Trainer stats!</p>

        {toast && (
          <div style={{ background: '#27272a', border: '1px solid #22c55e', color: '#22c55e', padding: '0.75rem 1rem', borderRadius: '8px', marginBottom: '1rem', fontWeight: 'bold', textAlign: 'center' }}>
            {toast}
          </div>
        )}

        {loading ? (
          <p style={{ color: '#71717a', textAlign: 'center' }}>Opening Backpack...</p>
        ) : items.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem', background: '#18181b', borderRadius: '12px', border: '1px dashed #3f3f46' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎒</div>
            <h3 style={{ color: '#ffffff', margin: '0 0 0.5rem 0' }}>Your Backpack is Empty!</h3>
            <p style={{ color: '#a1a1aa', margin: '0 0 1.5rem 0' }}>Earn PokéCoins by completing quests and buy items from the Pokémart.</p>
            <Link to="/shop" style={{ background: '#eab308', color: '#000', padding: '0.6rem 1.2rem', borderRadius: '8px', fontWeight: 'bold', textDecoration: 'none' }}>
              VISIT POKÉMART
            </Link>
          </div>
        ) : (
          <div className="inventory-grid">
            {items.map((item) => {
              const itemId = item.itemId || item.id;
              return (
                <div key={itemId} className="item-card">
                  <div style={{ fontSize: '2.5rem', marginBottom: '0.4rem' }}>{item.icon || '📦'}</div>
                  <h4 style={{ color: '#ffffff', margin: '0.2rem 0' }}>{item.name}</h4>
                  <p style={{ color: '#a1a1aa', fontSize: '0.75rem' }}>{item.desc}</p>
                  <span style={{ color: '#facc15', fontWeight: 'bold', fontSize: '0.8rem' }}>Quantity: x{item.qty}</span>
                  <button
                    disabled={usingId === itemId}
                    onClick={() => handleUseItem(item)}
                    style={{
                      width: '100%',
                      marginTop: '0.75rem',
                      background: '#22c55e',
                      border: 'none',
                      color: '#fff',
                      fontWeight: 'bold',
                      padding: '0.5rem',
                      borderRadius: '8px',
                      cursor: usingId === itemId ? 'not-allowed' : 'pointer',
                      opacity: usingId === itemId ? 0.6 : 1,
                    }}
                  >
                    {usingId === itemId ? 'USING...' : 'USE ITEM'}
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}