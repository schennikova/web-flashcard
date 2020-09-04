const express = require('express')
const mongoose = require('mongoose')
const middleware = require('./middleware/middleware-main')
const errorHandler = require('./utils/errorHandler')
const User = require('./models/User')
const FlashCards = require('./models/Flashcards')

const authRouter = require('./routes/auth')
const gameRouter = require('./routes/game')

const app = express()
const Qa = require('./models/QA')
mongoose.connect('mongodb://localhost:27017/flashcards', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

middleware(app)

app.get('/registration', (req, res) => {
  res.render('registration')
})

app.get('/login',(req,res)=>{
  res.render('login')
})

app.get('/', async (req, res) => {
  const flashCards = await FlashCards.find({})
  res.render('home', {flashCards})
})
app.get('/profile', async(req,res)=>{
  const user = await User.findOne({_id: req.app.locals.userId}).populate('games')
  const games = user.games
  console.log(games)
  try {
    if (user) {
      res.render('finishPage', {user, games})
    } else {
      res.redirect('/login')
    }
  } catch (e) {
    errorHandler(e)
  }
})

app.use('/api/auth', authRouter)
app.use('/api/game', gameRouter)

app.get('/game/:id', async (req, res) => {
  const {id} = req.params
  const flashCard = await FlashCards.findOne({_id: id}).populate('qid')
  const question = flashCard.qid[0].question
  const title = flashCard.title
  res.render('quiz', {title, question, id})
})



module.exports = app
