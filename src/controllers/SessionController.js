const RoleModel = require('../models/RoleModel')
const UserModel = require('../models/UserModel')
const LoginUserService = require('../services/sessionServices/LoginUserService')
const RegisterUserService = require('../services/sessionServices/RegisterUserService')
const FlashMessage = require('../utils/FlashMessage')

class SessionController {
  renderLoginPage(_, response) {
    response.render('pages/login.ejs')
  }

  async renderRegisterPage(request, response) {
    const { user } = request.session

    if (user) return response.redirect('/open-orders')

    const roleModel = new RoleModel()

    const roles = await roleModel.getUnrestrictedRoles()

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
    const { name, email, password, passwordConfirmation, roleId } = request.body

    const userModel = new UserModel()
    const roleModel = new RoleModel()
    const registerUserService = new RegisterUserService(userModel, roleModel)

    const { errors, user } = await registerUserService.execute({
      name,
      email,
      password,
      passwordConfirmation,
      roleId,
    })

    if (errors) {
      for (const error of errors) {
        this.flashMessage.add('error', error)
      }

      this.flashMessage.addMultipleByRoute('/register', { name, email, roleId })

      return response.redirect('/register')
    }

    request.session.user = {}

    Object.assign(request.session.user, user)

    response.flash('success', 'Bem vindo ' + user.name)

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
