const formatMessages = require('../helpers/formatMessages')
const formatUrlParams = require('../helpers/formatUrlParams')
const LoginUser = require('../services/session/LoginUser')
const RegisterUser = require('../services/session/registerUser')

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

  renderRegisterPage(request, response) {
    const queryParams = request.query
    const { errorMessages, name, email, password, passwordConfirmation } =
      queryParams

    const formatedErrorMessages = formatMessages('error', errorMessages)

    response.render('pages/register.ejs', {
      messages: formatedErrorMessages,
      name: name ?? '',
      email: email ?? '',
      password: password ?? '',
      passwordConfirmation: passwordConfirmation ?? '',
      password: password ?? '',
    })
  }

  async loginUser(request, response) {
    const { email, password } = request.body

    const loginUser = new LoginUser()

    const { errors, user } = await loginUser.execute(email, password)

    if (errors) {
      response.redirect(
        `/?errorMessages=${errors
          .map((error) => error.split(' ').join('-'))
          .join(';')}&${formatUrlParams({ email, password })}`
      )
      return
    }

    request.session.user = {
      id: user.id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
    }

    response.redirect('/open-orders')
  }

  async registerUser(request, response) {
    const { name, email, password, passwordConfirmation } = request.body

    console.log(name, email, password, passwordConfirmation);

    const registerUser = new RegisterUser()

    const { errors, user } = await registerUser.execute({
      name,
      email,
      password,
      passwordConfirmation,
    })

    if (errors) {
      response.redirect(
        `/register?errorMessages=${errors
          .map((error) => error.split(' ').join('-'))
          .join(';')}&${formatUrlParams({
          name,
          email,
          password,
          passwordConfirmation,
        })}`
      )
      return
    }

    response.send('ok')
  }
}

module.exports = SessionController
