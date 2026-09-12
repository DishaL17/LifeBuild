import User from '../models/User.js';

export const CATALOG_ITEMS = [
  { id: 'rare_candy', name: 'Rare Candy', price: 100, icon: '🍬', desc: 'Instantly grants +100 XP to your Trainer!' },
  { id: 'hyper_potion', name: 'Hyper Potion', price: 50, icon: '🧪', desc: 'Boosts Stamina/HP stat by +50.' },
  { id: 'fire_stone', name: 'Fire Stone', price: 250, icon: '🔥', desc: 'Grants +10 Strength & +10 Intellect.' },
  { id: 'thunder_stone', name: 'Thunder Stone', price: 250, icon: '⚡', desc: 'Grants +10 Agility & +100 PokéCoins.' },
  { id: 'master_ball', name: 'Master Ball', price: 500, icon: '🟣', desc: 'Unlocks Master Trainer status!' },
];

export const getShopItems = (req, res) => {
  return res.status(200).json({ items: CATALOG_ITEMS });
};

export const buyItem = async (req, res) => {
  try {
    const { itemId } = req.body;
    const item = CATALOG_ITEMS.find((i) => i.id === itemId);

    if (!item) {
      return res.status(404).json({ error: 'Item not found in catalog' });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: 'Trainer not found' });
    }

    if ((user.gold || 0) < item.price) {
      return res.status(400).json({
        error: `Insufficient PokéCoins! You need ${item.price} coins, but only have ${user.gold} coins.`,
      });
    }

    // Deduct price
    user.gold -= item.price;

    // Add or increment in inventory
    const existingIndex = user.inventory.findIndex((inv) => inv.itemId === item.id);
    if (existingIndex > -1) {
      user.inventory[existingIndex].qty += 1;
    } else {
      user.inventory.push({
        itemId: item.id,
        name: item.name,
        desc: item.desc,
        icon: item.icon,
        qty: 1,
      });
    }

    await user.save();

    return res.status(200).json({
      message: `Successfully purchased ${item.name}!`,
      gold: user.gold,
      inventory: user.inventory,
    });
  } catch (error) {
    console.error('buyItem error:', error);
    return res.status(500).json({ error: 'Failed to complete purchase: ' + error.message });
  }
};

export const getInventory = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: 'Trainer not found' });
    }

    return res.status(200).json({ inventory: user.inventory || [], gold: user.gold || 0 });
  } catch (error) {
    console.error('getInventory error:', error);
    return res.status(500).json({ error: 'Failed to fetch inventory: ' + error.message });
  }
};

export const useItem = async (req, res) => {
  try {
    const { itemId } = req.body;
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: 'Trainer not found' });
    }

    const itemIndex = user.inventory.findIndex((inv) => inv.itemId === itemId);
    if (itemIndex === -1 || user.inventory[itemIndex].qty <= 0) {
      return res.status(400).json({ error: 'You do not have this item in your inventory' });
    }

    // Decrement item
    user.inventory[itemIndex].qty -= 1;
    if (user.inventory[itemIndex].qty === 0) {
      user.inventory.splice(itemIndex, 1);
    }

    let effectMessage = '';
    let leveledUp = false;

    // Apply item power-up
    if (itemId === 'rare_candy') {
      user.xp = (user.xp || 0) + 100;
      let xpNeeded = Math.floor(100 * Math.pow(user.level || 1, 1.5));
      while (user.xp >= xpNeeded) {
        user.xp -= xpNeeded;
        user.level = (user.level || 1) + 1;
        leveledUp = true;
        xpNeeded = Math.floor(100 * Math.pow(user.level, 1.5));
      }
      user.currentXP = user.xp;
      user.nextLevelXP = xpNeeded;
      effectMessage = `Used Rare Candy! +100 XP gained!${leveledUp ? ' LEVELED UP!' : ''}`;
    } else if (itemId === 'hyper_potion') {
      user.hp = (user.hp || 100) + 50;
      effectMessage = 'Used Hyper Potion! +50 HP Stamina restored!';
    } else if (itemId === 'fire_stone') {
      user.str = (user.str ?? 0) + 10;
      user.int = (user.int ?? 0) + 10;
      effectMessage = 'Used Fire Stone! +10 STR & +10 INT permanently!';
    } else if (itemId === 'thunder_stone') {
      user.agi = (user.agi ?? 0) + 10;
      user.gold = (user.gold ?? 0) + 100;
      effectMessage = 'Used Thunder Stone! +10 AGI & +100 PokéCoins!';
    } else if (itemId === 'master_ball') {
      if (!user.unlockedBadges.includes('earth')) {
        user.unlockedBadges.push('earth');
      }
      effectMessage = 'Used Master Ball! Earth Badge unlocked!';
    }

    await user.save();

    return res.status(200).json({
      message: effectMessage,
      user: {
        id: user._id,
        level: user.level,
        xp: user.xp,
        currentXP: user.currentXP,
        nextLevelXP: user.nextLevelXP,
        gold: user.gold,
        str: user.str,
        int: user.int,
        wis: user.wis,
        agi: user.agi,
        hp: user.hp,
        inventory: user.inventory,
      },
      leveledUp,
    });
  } catch (error) {
    console.error('useItem error:', error);
    return res.status(500).json({ error: 'Failed to use item: ' + error.message });
  }
};
