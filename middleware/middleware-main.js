const express =require('express')

const hbs = require('hbs')
const logger = require('morgan')
const path = require('path')

module.exports = function middleware(app) {
  app.set('view engine', 'hbs')
  app.set('views', path.join(__dirname, '/../', 'views'))
  hbs.registerPartials(__dirname + '/../' + '/public/partials')


  app.use(express.json())
  app.use(express.urlencoded({extended: true}))
  app.use(logger('dev'))
  app.use(express.static(path.join(__dirname, '/../', 'public')))
}
