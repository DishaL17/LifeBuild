import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { soundEngine } from '../utils/soundeffects';
import './Shop.css';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function Shop() {
  const [gold, setGold] = useState(() => {
    const cached = localStorage.getItem('user');
    if (cached) {
      try {
        return JSON.parse(cached).gold ?? 0;
      } catch {}
    }
    return 0;
  });

  const [shopItems, setShopItems] = useState([
    { id: 'rare_candy', name: 'Rare Candy', price: 100, icon: '🍬', desc: 'Instantly grants +100 XP to your Trainer!' },
    { id: 'hyper_potion', name: 'Hyper Potion', price: 50, icon: '🧪', desc: 'Boosts Stamina/HP stat by +50.' },
    { id: 'fire_stone', name: 'Fire Stone', price: 250, icon: '🔥', desc: 'Grants +10 Strength & +10 Intellect.' },
    { id: 'thunder_stone', name: 'Thunder Stone', price: 250, icon: '⚡', desc: 'Grants +10 Agility & +100 PokéCoins.' },
    { id: 'master_ball', name: 'Master Ball', price: 500, icon: '🟣', desc: 'Unlocks Master Trainer status!' },
  ]);

  const [buyingId, setBuyingId] = useState(null);
  const [toast, setToast] = useState(null);
  const [popup, setPopup] = useState(null);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const closePopup = () => setPopup(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    // 1. Fetch live player profile and gold
    fetch(`${API_BASE}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.user && data.user.gold !== undefined) {
          setGold(data.user.gold);
        }
      })
      .catch((err) => console.error('Error fetching user gold:', err));

    // 2. Fetch catalog items
    fetch(`${API_BASE}/shop/items`)
      .then((res) => res.json())
      .then((data) => {
        if (data.items && data.items.length > 0) {
          setShopItems(data.items);
        }
      })
      .catch((err) => console.error('Error fetching shop items:', err));
  }, []);

  const handleBuy = async (item) => {
    const token = localStorage.getItem('token');
    if (!token) {
      showToast('⚠️ Please log in to buy items!');
      return;
    }

    if (gold < item.price) {
      soundEngine.playClick();
      setPopup({ success: false, item });
      return;
    }

    setBuyingId(item.id);

    try {
      const res = await fetch(`${API_BASE}/shop/buy`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ itemId: item.id }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      soundEngine.playQuestComplete();
      setGold(data.gold);

      // Update cached user
      const cached = localStorage.getItem('user');
      if (cached) {
        try {
          const u = JSON.parse(cached);
          u.gold = data.gold;
          u.inventory = data.inventory;
          localStorage.setItem('user', JSON.stringify(u));
        } catch {}
      }

      setPopup({ success: true, item });
      showToast(`🎉 ${data.message} Stored in Backpack!`);
    } catch (err) {
      showToast('⚠️ ' + (err.message || 'Purchase failed'));
    } finally {
      setBuyingId(null);
    }
  };

  return (
    <div className="shop-container">
      <div className="shop-content">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
          <h1 style={{ color: '#facc15', margin: 0 }}>🛒 POKÉMART CATALOG</h1>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <Link to="/inventory" style={{ color: '#38bdf8', fontWeight: 'bold', textDecoration: 'none' }}>🎒 My Backpack</Link>
            <Link to="/dashboard" style={{ color: '#ef4444', fontWeight: 'bold', textDecoration: 'none' }}>⬅️ Back to Dashboard</Link>
          </div>
        </div>

        {/* Live Gold Balance Banner */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#18181b', padding: '0.8rem 1.2rem', borderRadius: '10px', margin: '1rem 0', border: '1px solid #eab308' }}>
          <span style={{ color: '#a1a1aa' }}>Spend your quest-earned PokéCoins to buy rare items, potions, and elemental stones!</span>
          <span style={{ color: '#facc15', fontWeight: 'bold', fontSize: '1.2rem' }}>💰 {gold} PokéCoins</span>
        </div>

        {toast && (
          <div style={{ background: '#27272a', border: '1px solid #facc15', color: '#facc15', padding: '0.75rem 1rem', borderRadius: '8px', marginBottom: '1rem', fontWeight: 'bold', textAlign: 'center' }}>
            {toast}
          </div>
        )}

        <div className="shop-grid">
          {shopItems.map((item) => (
            <div key={item.id} className="shop-card">
              <div className="shop-avatar-icon">{item.icon}</div>
              <h4 style={{ margin: '0.2rem 0', color: '#ffffff' }}>{item.name}</h4>
              <p style={{ fontSize: '0.75rem', color: '#a1a1aa', margin: 0 }}>{item.desc}</p>
              <span style={{ color: '#facc15', fontWeight: 'bold' }}>💰 {item.price} PokéCoins</span>
              <button
                className="btn-buy"
                disabled={buyingId === item.id}
                onClick={() => handleBuy(item)}
                style={{
                  opacity: gold < item.price ? 0.7 : 1,
                  background: gold < item.price ? '#3f3f46' : '#eab308',
                  color: gold < item.price ? '#a1a1aa' : '#000',
                  cursor: 'pointer',
                }}
              >
                {buyingId === item.id ? 'BUYING...' : gold < item.price ? `NEED 💰 ${item.price}` : 'BUY ITEM'}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Purchase Result Popup */}
      {popup && (
        <div
          onClick={closePopup}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.75)',
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
              maxWidth: '360px',
              width: '90%',
              textAlign: 'center',
              boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
            }}
          >
            <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>
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
                <p style={{ color: '#38bdf8', fontSize: '0.8rem', marginTop: '0.4rem' }}>
                  Stored safely in your 🎒 Backpack!
                </p>
              </>
            ) : (
              <>
                <h2 style={{ color: '#ef4444', margin: '0 0 0.5rem 0' }}>Not Enough PokéCoins!</h2>
                <p style={{ color: '#e4e4e7', margin: 0 }}>
                  <strong>{popup.item.name}</strong> costs 💰 {popup.item.price}, but you currently have{' '}
                  💰 {gold}.
                </p>
                <p style={{ color: '#a1a1aa', fontSize: '0.85rem', marginTop: '0.6rem' }}>
                  Complete quests from your Quest Log to earn more PokéCoins!
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
                borderRadius: '10px',
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