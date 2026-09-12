import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const generateToken = (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET || 'supersecret_lifebuild_key_2026',
    { expiresIn: '30d' }
  );
};

// @desc    Register a new player / user
// @route   POST /api/auth/signup
export const signup = async (req, res) => {
  try {
    const { username, name, email, password, specialty, characterClass } = req.body;

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

    // Check if email or username already in use
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

    // Create user with default Level 1 RPG stats
    const user = await User.create({
      username: username.toLowerCase().trim(),
      name: name ? name.trim() : username.trim(),
      email: email.toLowerCase().trim(),
      password,
      specialty: specialty || 'electric',
      characterClass: characterClass || 'WARRIOR',
      level: 1,
      currentXP: 0,
      nextLevelXP: 100,
      gold: 50,
      currentStreak: 0,
      strength: 10,
      intellect: 10,
      vitality: 10,
      discipline: 10,
    });

    const token = generateToken(user._id);

    return res.status(201).json({
      message: 'Trainer profile initialized successfully!',
      token,
      user: {
        id: user._id,
        username: user.username,
        name: user.name,
        email: user.email,
        specialty: user.specialty,
        characterClass: user.characterClass,
        level: user.level,
        currentXP: user.currentXP,
        nextLevelXP: user.nextLevelXP,
        gold: user.gold,
        currentStreak: user.currentStreak,
        strength: user.strength,
        intellect: user.intellect,
        vitality: user.vitality,
        discipline: user.discipline,
        createdAt: user.createdAt,
      },
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

    // Support login via either email or username
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
      user: {
        id: user._id,
        username: user.username,
        name: user.name,
        email: user.email,
        specialty: user.specialty,
        characterClass: user.characterClass,
        level: user.level,
        currentXP: user.currentXP,
        nextLevelXP: user.nextLevelXP,
        gold: user.gold,
        currentStreak: user.currentStreak,
        strength: user.strength,
        intellect: user.intellect,
        vitality: user.vitality,
        discipline: user.discipline,
        createdAt: user.createdAt,
      },
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
      user: {
        id: user._id,
        username: user.username,
        name: user.name,
        email: user.email,
        specialty: user.specialty,
        characterClass: user.characterClass,
        level: user.level,
        currentXP: user.currentXP,
        nextLevelXP: user.nextLevelXP,
        gold: user.gold,
        currentStreak: user.currentStreak,
        strength: user.strength,
        intellect: user.intellect,
        vitality: user.vitality,
        discipline: user.discipline,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    console.error('GetMe error:', error);
    return res.status(500).json({ error: 'Server error fetching user profile' });
  }
};
