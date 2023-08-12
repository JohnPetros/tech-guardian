const formatMessage = require('../helpers/formatMessage')
const LoginUser = require('../services/session/LoginUser')

class SessionController {
  renderLoginPage(request, response) {
    const queryParams = request.query
    const { message, email, password } = queryParams

    response.render('pages/login.ejs', {
      message: message ? formatMessage(message) : '',
      email: email ?? '',
      password: password ?? '',
    })
  }

  async loginUser(request, response) {
    const { email, password } = request.body
    const loginUser = new LoginUser()

    const loggedUser = await loginUser.execute(email, password)

    if (!loggedUser) {
      response.redirect(
        `/?message=error:usuário-não-encontrado&email=${email}&password=${password}`
      )
      return
    }

    request.session.user = loggedUser

    response.redirect('/open-orders')
  }
}

module.exports = SessionController
