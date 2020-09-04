module.exports = function(req, res, next) {
  if (req.app.locals.userId) {
    next()
  } else {
    res.redirect('/')
  }
}
