import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Please provide a username'],
      unique: true,
      trim: true,
      lowercase: true,
    },
    name: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Please provide an email'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: 6,
      select: false, // Don't return password in queries by default
    },
    specialty: {
      type: String,
      default: 'electric', // matches frontend trainer/class theme
    },
    characterClass: {
      type: String,
      default: 'WARRIOR', // WARRIOR, MAGE, ROGUE, SCHOLAR
    },
    avatar: {
      type: String,
      default: '',
    },

    // RPG Progression System
    level: {
      type: Number,
      default: 1,
    },
    currentXP: {
      type: Number,
      default: 0,
    },
    xp: {
      type: Number,
      default: 0,
    },
    nextLevelXP: {
      type: Number,
      default: 100,
    },
    gold: {
      type: Number,
      default: 0,
    },
    currentStreak: {
      type: Number,
      default: 0,
    },
    streak: {
      type: Number,
      default: 0,
    },
    longestStreak: {
      type: Number,
      default: 0,
    },
    lastActiveDate: {
      type: Date,
      default: null,
    },

    // Companion Pokemon
    companionMon: {
      type: String,
      default: 'charmander', // charmander, pikachu, squirtle, bulbasaur
    },

    // RPG Core Attributes (start at 0 for new trainers)
    str: {
      type: Number,
      default: 0,
    },
    int: {
      type: Number,
      default: 0,
    },
    wis: {
      type: Number,
      default: 0,
    },
    agi: {
      type: Number,
      default: 0,
    },
    hp: {
      type: Number,
      default: 100,
    },
    strength: {
      type: Number,
      default: 0,
    },
    intellect: {
      type: Number,
      default: 0,
    },
    vitality: {
      type: Number,
      default: 100,
    },
    discipline: {
      type: Number,
      default: 0,
    },

    // Trainer Inventory
    inventory: [
      {
        itemId: { type: String, required: true },
        name: { type: String, required: true },
        desc: { type: String },
        icon: { type: String, default: '🎒' },
        qty: { type: Number, default: 1 },
      },
    ],

    // Unlocked Gym Badges
    unlockedBadges: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

// Hash password before saving
userSchema.pre('save', async function () {
  if (!this.isModified('password')) {
    return;
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Compare password method
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;
