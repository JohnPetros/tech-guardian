const PUBLIC_ROUTES = require('../constants/puplic-routes')
const FlashMessage = require('../utils/FlashMessage')

function checkSessionUserId(errorMessage) {
  return (request, response, next) => {
    const sessionUser = request.session.user
    const { user_id } = request.params

    const currentRoute = request.originalUrl

    const isPublicRoute = PUBLIC_ROUTES.includes(currentRoute)

    const previousPage =
      request.session.previousRoute ?? user ? '/open-orders' : '/'

    if (sessionUser.role === 'admin') {
      return next()
    }

    if (sessionUser.id !== user_id && isPublicRoute) {
      const flashMessage = new FlashMessage(response.flash)

      if (errorMessage) flashMessage.add('error', errorMessage)

      return response.redirect(previousPage)
    }

    if (sessionUser.id !== user_id && !isPublicRoute) {
      return response.redirect('/')
    }

    request.session.previousRoute = currentRoute

    next()
  }
}

module.exports = checkSessionUserId
