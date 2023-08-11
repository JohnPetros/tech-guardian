const ServerError = require('../errors/ServerError')
const LoginUser = require('../services/session/LoginUser')

class SessionController {
  renderLoginPage(_, response) {
    response.render('pages/login.ejs')
  }

  async loginUser(request, response, next) {
    const { email, password } = request.body
    const loginUser = new LoginUser()

    const loggedUser = await loginUser.execute(email, password)

    if (!loggedUser) {
      response.render('pages/login.ejs', {
        message: {
          type: 'error',
          body: 'Usuário não encontrado',
        },
        email,
        password,
      })
      return
    }

    request.session.user = loggedUser

    response.redirect('/open-orders')
  }
}

module.exports = SessionController
