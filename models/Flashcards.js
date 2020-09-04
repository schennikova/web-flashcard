const mongoose = require('mongoose');

const flashcardsSchema = new mongoose.Schema({
  title: String,
  description: String,
  qid:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'question'
  }]
})
const Flashcards = mongoose.model('flashcards', flashcardsSchema)

module.exports = Flashcards;
