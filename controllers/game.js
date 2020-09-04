const moment = require('moment')
const Game = require('../models/Games')
const User = require('../models/User')
const FlashCards = require('../models/Flashcards')
const errorHandler = require('../utils/errorHandler')

module.exports.startGame = async function(req, res) {
  try {
    const {id} = req.body
    const flashCard = await FlashCards.findOne({_id: id})
    const game = new Game({
      userid: req.app.locals.userId,
      flashCardName: flashCard.title,
      date: moment().format('MMMM Do YYYY, h:mm:ss a'),
    })
    await game.save()
    const user = await User.findOne({_id: req.app.locals.userId})
    user.games.push(game.id)
    await user.save()
    req.app.locals.gameId = game.id
    res.status(200).json({
      message: 'started',
    })
  } catch (e) {
    errorHandler(e, res)
  }
}

module.exports.play = async function(req, res) {
  try {
    const {answer} = req.body
    const {id, index} = req.params
    console.log(id, index, answer)
    const flashcard = await FlashCards.findOne({_id: id}).populate('qid')
    const correctAnswer = flashcard.qid[Number(index)].answer
    console.log(flashcard.qid.length)
    const nextQuestion = index >= flashcard.qid.length - 1
        ? 'Игра закончена'
        : flashcard.qid[Number(index) + 1].question
    console.log(nextQuestion)
    const statusOfAnswer = correctAnswer.toUpperCase() === answer.toUpperCase()
    console.log(correctAnswer, nextQuestion, statusOfAnswer)
    if (statusOfAnswer) {
      const game = await Game.findOne({_id: req.app.locals.gameId})
      console.log(game)
      game.score += 1
      await game.save()
    }
    res.json({
      statusOfAnswer,
      success: true,
      nextQuestion,
    })

  } catch (e) {
    errorHandler(e, res)
  }
}
