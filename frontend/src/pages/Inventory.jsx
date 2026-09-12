import { useState } from 'react';

const INITIAL_INVENTORY = [
  {
    id: 'inv_1',
    name: 'Elixir of Double XP',
    quantity: 2,
    icon: '🧪',
    type: 'Consumable',
    description: 'Grants +100% XP bonus for your next 3 completed quests.',
  },
  {
    id: 'inv_2',
    name: 'Iron Shortsword',
    quantity: 1,
    icon: '⚔️',
    type: 'Gear',
    description: 'Equipped in Weapon slot (+2 STR).',
  },
  {
    id: 'inv_3',
    name: 'Artisan Coffee Break Voucher',
    quantity: 1,
    icon: '☕',
    type: 'Reward',
    description: 'Redeem for 1 guilt-free fancy coffee break!',
  },
];

export default function Inventory() {
  const [items, setItems] = useState(INITIAL_INVENTORY);
  const [filter, setFilter] = useState('All');
  const [actionNotice, setActionNotice] = useState('');

  const handleUseItem = (item) => {
    setActionNotice(`You used 1x ${item.name}!`);

    setItems((prev) =>
      prev
        .map((i) => (i.id === item.id ? { ...i, quantity: i.quantity - 1 } : i))
        .filter((i) => i.quantity > 0)
    );

    setTimeout(() => {
      setActionNotice('');
    }, 3500);
  };

  const filteredItems = items.filter((item) => {
    if (filter === 'All') return true;
    return item.type === filter;
  });

  return (
    <div className="inventory-page">
      <div className="inventory-header">
        <div>
          <h2>Adventurer's Backpack</h2>
          <p>Inspect your collected loot, gear, potions, and earned real-life vouchers.</p>
        </div>

        <div className="inventory-filters">
          {['All', 'Consumable', 'Gear', 'Reward'].map((f) => (
            <button
              key={f}
              className={`filter-btn ${filter === f ? 'active' : ''}`}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {actionNotice && <div className="inventory-notice">{actionNotice}</div>}

      {filteredItems.length === 0 ? (
        <div className="empty-inventory">
          <p>🎒 Your backpack is empty in this category.</p>
        </div>
      ) : (
        <div className="inventory-grid">
          {filteredItems.map((item) => (
            <div key={item.id} className="inventory-card">
              <div className="inventory-icon-box">
                <span className="item-icon">{item.icon}</span>
                {item.quantity > 1 && (
                  <span className="item-qty-badge">x{item.quantity}</span>
                )}
              </div>

              <div className="inventory-details">
                <span className="inventory-tag">{item.type}</span>
                <h4>{item.name}</h4>
                <p>{item.description}</p>
              </div>

              <div className="inventory-actions">
                <button
                  className="btn-use-item"
                  onClick={() => handleUseItem(item)}
                >
                  {item.type === 'Reward' ? 'Redeem Voucher' : 'Use Item'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
