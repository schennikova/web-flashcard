const Flashcard = require('./Flashcards')
const Qa = require('./QA')
const mongoose = require('mongoose')

async function createQa() {
  mongoose.connect('mongodb://localhost:27017/flashcards', {
    useUnifiedTopology: true,
    useNewUrlParser: true
  })
  const newQa = new Qa({
    question: 'Сколько типов данных в JavaScript',
    answer: '8'
  })
  const newQa2 = new Qa({
    question: 'Год создания javaScript',
    answer: '1995'
  })
  const newQa3 = new Qa({
    question: 'Чем заменить var',
    answer: 'let,const'
  })

  const newQa4 = new Qa({
    question: 'Строгий режим в JavaScript?',
    answer: 'use strict'
  })
  const newQa5 = new Qa({
    question: 'True or false? JavaScript the best?',
    answer: 'true'
  })



  const newFC = new Flashcard({
    title: 'Test 1',
    description: 'супер новый тест',
    qid: [newQa.id, newQa2.id, newQa3.id, newQa4.id, newQa5.id]
  })
  await newFC.save()
  await newQa.save()
  await newQa2.save()
  await newQa3.save()
  await newQa4.save()
  await newQa5.save()
  mongoose.connection.close()
}

createQa()
