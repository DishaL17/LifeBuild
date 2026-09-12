import { useState } from 'react';

const SHOP_ITEMS = [
  {
    id: 'potion_xp',
    name: 'Elixir of Double XP',
    price: 150,
    icon: '🧪',
    category: 'Consumable',
    description: 'Grants +100% XP bonus for your next 3 completed quests.',
  },
  {
    id: 'streak_shield',
    name: 'Streak Aegis (Freeze)',
    price: 200,
    icon: '🛡️',
    category: 'Consumable',
    description: 'Protects your streak from resetting if you miss a day.',
  },
  {
    id: 'reward_coffee',
    name: 'Artisan Coffee Break',
    price: 100,
    icon: '☕',
    category: 'Custom Reward',
    description: 'Treat yourself to your favorite specialty coffee guilt-free!',
  },
  {
    id: 'reward_game_night',
    name: '1-Hour Gaming Session',
    price: 180,
    icon: '🎮',
    category: 'Custom Reward',
    description: 'Uninterrupted gaming session reward after completing daily tasks.',
  },
  {
    id: 'gear_boots',
    name: 'Swift Boots of Haste',
    price: 350,
    icon: '👢',
    category: 'Equipment',
    description: 'Permanent equipment adding +2 Agility to your character.',
  },
];

export default function Shop() {
  const [playerGold, setPlayerGold] = useState(240);
  const [purchaseMsg, setPurchaseMsg] = useState('');

  const handleBuy = (item) => {
    if (playerGold < item.price) {
      setPurchaseMsg(`Not enough gold to buy ${item.name}!`);
      return;
    }

    setPlayerGold((prev) => prev - item.price);
    setPurchaseMsg(`Successfully purchased ${item.name}! Added to your inventory.`);

    setTimeout(() => {
      setPurchaseMsg('');
    }, 4000);
  };

  return (
    <div className="shop-page">
      <div className="shop-header">
        <div>
          <h2>Merchant Bazaar</h2>
          <p>Redeem your hard-earned gold for real-life rewards and magical boosts.</p>
        </div>
        <div className="player-gold-badge">
          🪙 <span className="gold-amount">{playerGold}</span> Gold
        </div>
      </div>

      {purchaseMsg && <div className="shop-notification">{purchaseMsg}</div>}

      <div className="shop-items-grid">
        {SHOP_ITEMS.map((item) => (
          <div key={item.id} className="shop-card">
            <div className="shop-item-icon">{item.icon}</div>
            <span className="shop-category-tag">{item.category}</span>
            <h4>{item.name}</h4>
            <p>{item.description}</p>
            <div className="shop-card-footer">
              <span className="item-price">🪙 {item.price} Gold</span>
              <button
                className="btn-buy"
                disabled={playerGold < item.price}
                onClick={() => handleBuy(item)}
              >
                Buy
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
