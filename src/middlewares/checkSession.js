const publicRoutes = ['/', '/register', '/login-user', '/register-user']

function checkSession(request, response, next) {
  const { user } = request.session

  const currentRoute = request.originalUrl

  if (!user && !publicRoutes.includes(currentRoute)) {
    return response.redirect('/')
  }

  next()
}

module.exports = checkSession
