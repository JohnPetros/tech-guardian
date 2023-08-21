const getPreviousRoute = require('../helpers/getPreviousRoute')

const publicRoutes = ['/', '/register', '/login-user', '/register-user']

function checkSession(request, response, next) {
  const { user } = request.session

  const currentRoute = request.originalUrl

  const isPublicRoute = publicRoutes.includes(currentRoute)

  const previousPage =
    request.session.previousRoute ?? user ? '/open-orders' : '/'

  if (user && isPublicRoute) {
    return response.redirect(previousPage)
  }

  if (!user && !isPublicRoute) {
    return response.redirect('/')
  }

  request.session.previousRoute = currentRoute

  console.log(request.session)

  next()
}

module.exports = checkSession
