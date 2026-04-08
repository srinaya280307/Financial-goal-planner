const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: [true, 'Please add a text value for title'],
  },
  targetAmount: {
    type: Number,
    required: [true, 'Please set a target amount'],
  },
  currentSavings: {
    type: Number,
    default: 0,
  },
  deadline: {
    type: Date,
    required: [true, 'Please set a deadline'],
  },
  category: {
    type: String,
    enum: ['Travel', 'Education', 'Emergency Fund', 'Retirement', 'Home', 'Vehicle', 'Other'],
    default: 'Other',
  },
}, { timestamps: true });

module.exports = mongoose.model('Goal', goalSchema);
