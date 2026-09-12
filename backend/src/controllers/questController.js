import Quest from '../models/Quest.js';
import User from '../models/User.js';

export const getQuests = async (req, res) => {
  try {
    const quests = await Quest.find({ userId: req.user.id }).sort({ createdAt: -1 });
    return res.status(200).json({ quests });
  } catch (error) {
    console.error('getQuests error:', error);
    return res.status(500).json({ error: 'Failed to fetch quests: ' + error.message });
  }
};

export const createQuest = async (req, res) => {
  try {
    const { title, attribute, difficulty } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({ error: 'Quest title is required' });
    }

    let xp = 25;
    let gold = 15;
    if (difficulty === 'Medium') {
      xp = 60;
      gold = 35;
    } else if (difficulty === 'Hard') {
      xp = 120;
      gold = 75;
    } else if (difficulty === 'Boss') {
      xp = 250;
      gold = 150;
    }

    const quest = await Quest.create({
      userId: req.user.id,
      title: title.trim(),
      attribute: attribute || 'int',
      difficulty: difficulty || 'Easy',
      xp,
      gold,
      completed: false,
    });

    return res.status(201).json({ quest });
  } catch (error) {
    console.error('createQuest error:', error);
    return res.status(500).json({ error: 'Failed to create quest: ' + error.message });
  }
};

export const toggleQuest = async (req, res) => {
  try {
    const quest = await Quest.findOne({ _id: req.params.id, userId: req.user.id });
    if (!quest) {
      return res.status(404).json({ error: 'Quest not found' });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: 'Trainer profile not found' });
    }

    const isCompleting = !quest.completed;
    let leveledUp = false;

    if (isCompleting) {
      quest.completed = true;
      quest.completedAt = new Date();

      // Add rewards
      user.xp = (user.xp || 0) + quest.xp;
      user.gold = (user.gold || 0) + quest.gold;

      // Attributes boost
      if (quest.attribute === 'str') user.str = (user.str ?? 0) + 2;
      if (quest.attribute === 'int') user.int = (user.int ?? 0) + 2;
      if (quest.attribute === 'wis') user.wis = (user.wis ?? 0) + 2;
      if (quest.attribute === 'agi') user.agi = (user.agi ?? 0) + 2;
      if (quest.attribute === 'hp') user.hp = (user.hp ?? 100) + 5;

      // Check non-linear level-up threshold: 100 * level^1.5
      let xpNeeded = Math.floor(100 * Math.pow(user.level || 1, 1.5));
      while (user.xp >= xpNeeded) {
        user.xp -= xpNeeded;
        user.level = (user.level || 1) + 1;
        leveledUp = true;
        xpNeeded = Math.floor(100 * Math.pow(user.level, 1.5));
      }

      user.currentXP = user.xp;
      user.nextLevelXP = xpNeeded;

      // Daily Streak Logic
      const today = new Date();
      if (user.lastActiveDate) {
        const last = new Date(user.lastActiveDate);
        const diffDays = Math.floor((today - last) / (1000 * 60 * 60 * 24));
        if (diffDays === 1) {
          user.streak = (user.streak || 0) + 1;
          user.currentStreak = user.streak;
          if (user.streak > (user.longestStreak || 0)) {
            user.longestStreak = user.streak;
          }
        } else if (diffDays > 1) {
          user.streak = 1;
          user.currentStreak = 1;
        }
      } else {
        user.streak = 1;
        user.currentStreak = 1;
      }
      user.lastActiveDate = today;
    } else {
      // Uncompleting quest
      quest.completed = false;
      quest.completedAt = null;

      user.xp = Math.max(0, (user.xp || 0) - quest.xp);
      user.gold = Math.max(0, (user.gold || 0) - quest.gold);
      user.currentXP = user.xp;

      if (quest.attribute === 'str') user.str = Math.max(0, (user.str ?? 0) - 2);
      if (quest.attribute === 'int') user.int = Math.max(0, (user.int ?? 0) - 2);
      if (quest.attribute === 'wis') user.wis = Math.max(0, (user.wis ?? 0) - 2);
      if (quest.attribute === 'agi') user.agi = Math.max(0, (user.agi ?? 0) - 2);
      if (quest.attribute === 'hp') user.hp = Math.max(100, (user.hp ?? 100) - 5);
    }

    await quest.save();
    await user.save();

    return res.status(200).json({
      quest,
      user: {
        id: user._id,
        username: user.username,
        name: user.name,
        email: user.email,
        level: user.level,
        xp: user.xp,
        currentXP: user.currentXP,
        nextLevelXP: user.nextLevelXP,
        gold: user.gold,
        streak: user.streak,
        currentStreak: user.currentStreak,
        companionMon: user.companionMon,
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
    console.error('toggleQuest error:', error);
    return res.status(500).json({ error: 'Failed to toggle quest: ' + error.message });
  }
};

export const deleteQuest = async (req, res) => {
  try {
    const quest = await Quest.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!quest) {
      return res.status(404).json({ error: 'Quest not found' });
    }
    return res.status(200).json({ success: true, message: 'Quest deleted successfully' });
  } catch (error) {
    console.error('deleteQuest error:', error);
    return res.status(500).json({ error: 'Failed to delete quest: ' + error.message });
  }
};
