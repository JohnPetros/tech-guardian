const ServerError = require('../errors/ServerError')

function handleServerError(error, request, response, next) {
  if (error instanceof ServerError) {
    return response.status(error.status).render(error.page, {
      message: {
        type: 'error',
        body: error.message,
      },
      ...error.pageData,
    })
  }

  response.status(500).render('pages/error.ejs')
}

module.exports = handleServerError
