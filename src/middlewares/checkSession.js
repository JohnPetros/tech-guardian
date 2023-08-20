const publicRoutes = ['/', '/register', '/login-user', '/register-user']

function checkSession(request, response, next) {
  const { user } = request.session

  const currentRoute = request.originalUrl
  const previousRoute = request.session.previousRoute ?? '/open-orders'

  if (user && publicRoutes.includes(currentRoute)) {
    return response.redirect(previousRoute)
  }

  if (!user && !publicRoutes.includes(currentRoute)) {
    return response.redirect('/')
  }

  request.session.previousRoute = currentRoute

  next()
}

module.exports = checkSession
