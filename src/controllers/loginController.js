class LoginController {
  getLoginPage(_, request) {
    console.log(request)

    request.render('pages/login')
  }
}

module.exports = LoginController
