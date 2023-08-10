class LoginController {
  getLoginPage(_, request) {
    request.render('pages/login.ejs')
  }
}

module.exports = LoginController
