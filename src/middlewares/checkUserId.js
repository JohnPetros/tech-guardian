const getPreviousRoute = require('../helpers/getPreviousRoute')
const FlashMessage = require('../utils/FlashMessage')

function checkId(errorMessage) {
  return (request, response, next) => {
    const { user } = request.session
    const { user_id } = request.body

    const previousRoute =
    request.session.previousRoute ?? user ? '/open-orders' : '/'

    if (!user_id || user.id !== user_id) {
      const flashMessage = new FlashMessage(response.flash)

      flashMessage.add('error', errorMessage)

      flashMessage.addMultipleByRoute(previousRoute, request.body)

      return response.redirect(previousRoute)
    }

    next()
  }
}

module.exports = checkId
