const getPreviousRoute = require('../helpers/getPreviousRoute')
const FlashMessage = require('../utils/FlashMessage')

function checkRole(role, errorMessage) {
  return (request, response, next) => {
    const { user } = request.session

    const previousRoute = getPreviousRoute(request)

    if (user.role !== role) {
      const flashMessage = new FlashMessage(response.flash)

      flashMessage.add('error', errorMessage)

      flashMessage.addMultipleByRoute(previousRoute, request.body)

      return response.redirect(previousRoute)
    }

    next()
  }
}

module.exports = checkRole
