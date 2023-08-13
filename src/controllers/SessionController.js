const formatMessages = require('../helpers/formatMessages')
const formatUrlParams = require('../helpers/formatUrlParams')
const Role = require('../models/Role')
const User = require('../models/user')
const LoginUser = require('../services/session/LoginUser')
const GetUnrestrictRoles = require('../services/session/getUnrestrictRoles')
const RegisterUser = require('../services/session/registerUser')

class SessionController {
  renderLoginPage(request, response) {
    const queryParams = request.query
    const { errorMessages, email } = queryParams

    const formatedErrorMessages = formatMessages('error', errorMessages)

    response.render('pages/login.ejs', {
      messages: formatedErrorMessages,
      email: email ?? '',
    })
  }

  async renderRegisterPage(request, response) {
    const { user } = request.session

    if (user) return response.redirect('/open-orders')

    const queryParams = request.query
    const { errorMessages, name, email } = queryParams

    const formatedErrorMessages = formatMessages('error', errorMessages)

    const role = new Role()
    const getUnrestrictedRoles = new GetUnrestrictRoles(role)
    const roles = await getUnrestrictedRoles.execute()

    response.render('pages/register.ejs', {
      messages: formatedErrorMessages,
      name: name ?? '',
      email: email ?? '',
      roles,
    })
  }

  async loginUser(request, response) {
    const { email, password } = request.body

    const userModel = new User()
    const loginUser = new LoginUser(userModel)

    const { errors, user } = await loginUser.execute(email, password)

    if (errors) {
      response.redirect(
        `/?errorMessages=${errors
          .map((error) => error.split(' ').join('-'))
          .join(';')}&${formatUrlParams({ email, password })}`
      )
      return
    }

    request.session.user = {}

    Object.assign(request.session.user, user)

    response.redirect('/open-orders')
  }

  async registerUser(request, response) {
    const { name, email, password, passwordConfirmation } = request.body

    const userModel = new User()
    const registerUser = new RegisterUser(userModel)

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
        })}`
      )
      return
    }

    request.session.user = {}

    Object.assign(request.session.user, user)

    response.redirect('/open-orders')
  }

  logoutUser(request, response) {
    request.session.destroy((error) => {
      if (error) {
        console.error(error)
        return response.redirect('back')
      }

      return response.redirect('/')
    })
  }
}

module.exports = SessionController
