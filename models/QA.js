const mongoose = require("mongoose");

const qaSchema = new mongoose.Schema({
  answer: String,
  question: String,
});

const QA = mongoose.model('question', qaSchema)

module.exports = QA;
