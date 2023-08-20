const getPreviousRoute = require('../helpers/getPreviousRoute')

function checkRole(role) {
  return (request, response, next) => {
    const { user } = request.session

    const previousRoute = getPreviousRoute(request)

    if (user.role !== role) {
      return response.redirect(previousRoute)
    }

    next()
  }
}

module.exports = checkRole
