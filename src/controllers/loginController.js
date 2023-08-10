class LoginController {
  getLoginPage(_, response) {
    response.render('pages/login.ejs')
  }

  handleLogin(request, response) {
    const { email, password } = request.body

    request.session.name = 'joao'
    console.log(request.session.name)
  }
}

module.exports = LoginController
