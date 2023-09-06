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

    request.session.previousRoute = currentRoute

    if (sessionUser.role === 'admin') {
      return next()
    }
    const flashMessage = new FlashMessage(response.flash)

    if (sessionUser.id !== user_id && isPublicRoute) {

      if (errorMessage) flashMessage.add('error', errorMessage)

      return response.redirect(previousPage)
    }

    console.log(sessionUser.id !== user_id)


    if (sessionUser.id !== user_id && !isPublicRoute) {
      if (errorMessage) flashMessage.add('error', errorMessage)

      return response.redirect('/')
    }

    next()
  }
}

module.exports = checkSessionUserId
