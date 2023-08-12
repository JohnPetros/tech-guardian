function handleServerError(error, request, response) {
  response.status(500).render('pages/error.ejs')
}

module.exports = handleServerError
