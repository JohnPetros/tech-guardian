function handleServerError(error, request, response, next) {
  console.error(error)
  response.status(500).render('pages/error.ejs')
}

module.exports = handleServerError
