const PUBLIC_ROUTES = require("../constants/puplic-routes")

function checkSession(request, response, next) {
  const { user } = request.session

  const currentRoute = request.originalUrl

  const isPublicRoute = PUBLIC_ROUTES.includes(currentRoute)

  const previousPage =
    request.session.previousRoute ?? user ? '/open-orders' : '/'

  if (user && isPublicRoute) {
    return response.redirect(previousPage)
  }

  if (!user && !isPublicRoute) {
    return response.redirect('/')
  }

  request.session.previousRoute = currentRoute


  next()
}

module.exports = checkSession
