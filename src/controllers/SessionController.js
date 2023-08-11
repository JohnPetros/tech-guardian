const LoginUser = require('../services/session/LoginUser')

class SessionController {
  renderLoginPage(_, response) {
    response.render('pages/login.ejs')
  }

  loginUser(request, response) {
    const { email, password } = request.body
    const loginUser = new LoginUser()

    const loggedUser = loginUser.execute(email, password)

    if (!loggedUser) {
      response.render('pages/login.ejs', { message: 'Usuário não encontrado' })
    }

    request.session.user = loggedUser

    response.render('pages/dashboard/order.ejs')
  }
}

module.exports = SessionController
