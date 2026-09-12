import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const generateToken = (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET || 'supersecret_lifebuild_key_2026',
    { expiresIn: '30d' }
  );
};

const formatUser = (user) => ({
  id: user._id,
  username: user.username,
  name: user.name || user.username,
  email: user.email,
  specialty: user.specialty,
  characterClass: user.characterClass,
  level: user.level || 1,
  xp: user.xp ?? user.currentXP ?? 0,
  currentXP: user.xp ?? user.currentXP ?? 0,
  nextLevelXP: user.nextLevelXP || 100,
  gold: user.gold ?? 0,
  streak: user.streak ?? user.currentStreak ?? 0,
  currentStreak: user.streak ?? user.currentStreak ?? 0,
  companionMon: user.companionMon || 'charmander',
  str: user.str ?? 0,
  int: user.int ?? 0,
  wis: user.wis ?? 0,
  agi: user.agi ?? 0,
  hp: user.hp ?? 100,
  inventory: user.inventory || [],
  unlockedBadges: user.unlockedBadges || [],
  createdAt: user.createdAt,
});

// @desc    Register a new player / user
// @route   POST /api/auth/signup
export const signup = async (req, res) => {
  try {
    const { username, name, email, password, specialty, characterClass, companionMon } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        error: 'Please provide username, email, and password',
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        error: 'Password must be at least 6 characters long',
      });
    }

    const userExists = await User.findOne({
      $or: [
        { email: email.toLowerCase().trim() },
        { username: username.toLowerCase().trim() },
      ],
    });

    if (userExists) {
      const field = userExists.email === email.toLowerCase().trim() ? 'Email' : 'Username';
      return res.status(400).json({ error: `${field} is already registered` });
    }

    const user = await User.create({
      username: username.toLowerCase().trim(),
      name: name ? name.trim() : username.trim(),
      email: email.toLowerCase().trim(),
      password,
      specialty: specialty || 'electric',
      characterClass: characterClass || 'WARRIOR',
      companionMon: companionMon || (specialty === 'electric' ? 'pikachu' : 'charmander'),
      level: 1,
      xp: 0,
      currentXP: 0,
      nextLevelXP: 100,
      gold: 0,
      streak: 0,
      currentStreak: 0,
      str: 0,
      int: 0,
      wis: 0,
      agi: 0,
      hp: 100,
      inventory: [],
    });

    const token = generateToken(user._id);

    return res.status(201).json({
      message: 'Trainer profile initialized successfully!',
      token,
      user: formatUser(user),
    });
  } catch (error) {
    console.error('Signup error:', error);
    return res.status(500).json({ error: 'Server error during signup. ' + error.message });
  }
};

// @desc    Authenticate player & get token
// @route   POST /api/auth/login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Please provide email/username and password' });
    }

    const cleanIdentifier = email.toLowerCase().trim();

    const user = await User.findOne({
      $or: [{ email: cleanIdentifier }, { username: cleanIdentifier }],
    }).select('+password');

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials. User not found.' });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials. Incorrect password.' });
    }

    const token = generateToken(user._id);

    return res.status(200).json({
      message: 'Login successful!',
      token,
      user: formatUser(user),
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ error: 'Server error during login. ' + error.message });
  }
};

// @desc    Get current logged in user profile & live stats
// @route   GET /api/auth/me
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.status(200).json({
      user: formatUser(user),
    });
  } catch (error) {
    console.error('GetMe error:', error);
    return res.status(500).json({ error: 'Server error fetching user profile' });
  }
};

// @desc    Change starter Pokemon companion
// @route   PATCH /api/auth/companion
export const updateCompanion = async (req, res) => {
  try {
    const { companionMon } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { companionMon },
      { new: true }
    );
    return res.status(200).json({ user: formatUser(user) });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
