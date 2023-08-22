const RoleModel = require('../models/RoleModel')
const UserModel = require('../models/UserModel')
const LoginUserService = require('../services/sessionServices/LoginUserService')
const RegisterUserService = require('../services/sessionServices/RegisterUserService')
const FlashMessage = require('../utils/FlashMessage')

class SessionController {
  renderLoginPage(_, response) {
    response.render('pages/login.ejs')
  }

  async renderRegisterPage(_, response) {
    const roleModel = new RoleModel()

    const roles = await roleModel.getUnrestrictedOnes()

    response.render('pages/register.ejs', {
      roles,
    })
  }

  async loginUser(request, response) {
    const { email, password } = request.body

    const userModel = new UserModel()
    const roleModel = new RoleModel()

    const loginUser = new LoginUserService(userModel, roleModel)

    const { errors, user } = await loginUser.execute(email, password)

    const flashMessage = new FlashMessage(response.flash)

    if (errors) {
      for (const error of errors) {
        flashMessage.add('error', error)
      }

      flashMessage.addMultipleByRoute('/', { email })

      return response.redirect('/')
    }

    flashMessage.add('success', 'Bem vindo ' + user.name)

    request.session.user = {}

    Object.assign(request.session.user, user)

    response.redirect('/open-orders')
  }

  async registerUser(request, response) {
    const { name, email, password, password_confirmation, role_id } =
      request.body
      
    const userModel = new UserModel()
    const roleModel = new RoleModel()
    const registerUserService = new RegisterUserService(userModel, roleModel)

    const { errors, user } = await registerUserService.execute({
      name,
      email,
      password,
      password_confirmation,
      role_id,
    })

    const flashMessage = new FlashMessage(response.flash)

    if (errors) {

      for (const error of errors) {
        flashMessage.add('error', error)
      }

      flashMessage.addMultipleByRoute('/register', { name, email, role_id })

      return response.redirect('/register')
    }

    flashMessage.add('success', 'Bem vindo ' + user.name)

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
