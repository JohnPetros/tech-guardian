const FlashMessage = require('../utils/FlashMessage')

function checkRole(role, errorMessage) {
  return (request, response, next) => {
    const { user } = request.session

    const currentRoute = request.originalUrl
    const previousRoute =
      request.session.previousRoute === currentRoute
        ? '/open-orders'
        : request.session.previousRoute

    if (user.role === 'admin') {
      return next()
    }

    if (user.role !== role) {
      const flashMessage = new FlashMessage(response.flash)

      if (errorMessage) flashMessage.add('error', errorMessage)

      flashMessage.addMultipleByRoute(previousRoute, request.body)

      return response.redirect('back')
    }

    next()
  }
}

module.exports = checkRole
