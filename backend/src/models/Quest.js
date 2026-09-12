import mongoose from 'mongoose';

const questSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: [true, 'Please provide a quest title'],
      trim: true,
    },
    attribute: {
      type: String,
      enum: ['str', 'int', 'wis', 'agi', 'hp'],
      default: 'int',
    },
    difficulty: {
      type: String,
      enum: ['Easy', 'Medium', 'Hard', 'Boss'],
      default: 'Easy',
    },
    xp: {
      type: Number,
      default: 25,
    },
    gold: {
      type: Number,
      default: 15,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    completedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const Quest = mongoose.model('Quest', questSchema);

export default Quest;
