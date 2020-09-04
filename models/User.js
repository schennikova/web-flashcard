const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  score: {
    type: Number,
    default: 0,
  },
  email: {
    type: String,
    unique: true,
  },
  games: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'games',
    },
  ],
});

const User = mongoose.model('user', userSchema);

module.exports = User;
