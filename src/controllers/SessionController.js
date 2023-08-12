const formatMessages = require('../helpers/formatMessages')
const LoginUser = require('../services/session/LoginUser')

class SessionController {
  renderLoginPage(request, response) {
    const queryParams = request.query
    const { errorMessages, email, password } = queryParams

    const formatedErrorMessages = formatMessages('error', errorMessages)

    response.render('pages/login.ejs', {
      messages: formatedErrorMessages,
      email: email ?? '',
      password: password ?? '',
    })
  }

  async loginUser(request, response) {
    const { email, password } = request.body

    const loginUser = new LoginUser()

    const { errors, user } = await loginUser.execute(email, password)

    console.log(errors);

    if (errors.length) {
      response.redirect(
        `/?errorMessages=${errors
          .map((error) => error.split(' ').join('-'))
          .join(';')}&email=${email}&password=${password}`
      )
      return
    }

    request.session.user = user

    response.redirect('/open-orders')
  }
}

module.exports = SessionController
