module.exports = function(req, res, next) {
  console.log(req.app.locals.userId)
  if (req.app.locals.userId) {
    res.redirect('/')
  } else {
    next()
  }
}
