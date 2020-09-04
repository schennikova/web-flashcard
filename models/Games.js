const mongoose = require('mongoose');
const Schema = mongoose.Schema

const gamesSchema = new Schema({
  userid: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  score: {type: Number, default: 0},
  date: String,
  flashCardName: String
})

const Games = mongoose.model('games', gamesSchema)

module.exports = Games;
