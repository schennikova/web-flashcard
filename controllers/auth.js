const User = require('../models/User')
const errorHandler = require('../utils/errorHandler')
const app = require('../app')

module.exports.login = async function(req, res) {
  const {email, name} = req.body
  try {
    const user = await User.findOne({email: email, name: name})
    if (!user) {
      res.status(404).json({
        message: 'User is not found',
        success: false,
      })
    } else {
      res.app.locals.userId = user.id
      res.status(200).json({
        message: 'login',
        success: true
      })
    }
  } catch (e) {
    errorHandler(e)
  }
}

module.exports.registration = async function(req, res) {
  try {
    const candidate = await User.findOne({email: req.body.email})
    if (candidate) {
      res.status(409).json({
        message: 'User already exist',
        success: false,
      })
    } else {
      const user = new User({
        name: req.body.name,
        email: req.body.email,
      })
      await user.save()
      res.json({
        message: 'ok',
        success: true
      })
    }
  } catch (e) {
    errorHandler(e)
  }
}


