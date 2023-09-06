const RoleModel = require('../models/RoleModel')
const UserModel = require('../models/UserModel')

const CreateUserService = require('../services/userServices/CreateUserService')
const DeleteUserService = require('../services/userServices/DeleteUserService')
const EditUserService = require('../services/userServices/EditUserService')
const GetUserByIdService = require('../services/userServices/GetUserByIdService')

const FlashMessage = require('../utils/FlashMessage')

class UsersController {
  async renderUsersPage(request, response) {
    const { user } = request.session
    const { search, page, roles_ids } = request.query

    const userModel = new UserModel()

    const { users, count } = await userModel.getAll({
      search,
      page,
      sessionUserId: user.id,
      roles_ids,
    })

    const roleModel = new RoleModel()

    const roles = await roleModel.getAll()

    response.render('pages/users.ejs', {
      user,
      users,
      search,
      page,
      usersCount: count,
      roles,
      roles_ids,
    })
  }

  async renderUserPage(request, response) {
    const { user_id } = request.params

    const userModel = new UserModel()

    const getUserByIdService = new GetUserByIdService(userModel)

    const user = await getUserByIdService.execute(user_id)

    if (user === 'Usuário não encontrado') {
      const flashMessage = new FlashMessage(response.flash)

      flashMessage.add('error', 'Solicitação não encontrada')

      return response.redirect('/open-orders')
    }

    const roleModel = new RoleModel()

    const roles = await roleModel.getAll()

    response.render('pages/user.ejs', {
      user,
      sessionUser: request.session.user,
      roles,
    })
  }

  async renderNewUserPage(request, response) {
    const { user } = request.session

    const roleModel = new RoleModel()

    const roles = await roleModel.getAll()

    response.render('pages/new-user.ejs', { user, roles })
  }

  async editUser(request, response) {
    const { user_id } = request.params
    const { name, email, password, password_confirmation, role_id } =
      request.body

    const avatarFile = request.file

    const userModel = new UserModel()

    const editOderService = new EditUserService(userModel)

    const { errors, updatedUserId } = await editOderService.execute({
      user_id,
      name,
      email,
      password,
      password_confirmation,
      avatarFile,
      role_id,
    })

    const flashMessage = new FlashMessage(response.flash)

    if (errors) {
      for (const error of errors) {
        flashMessage.add('error', error)
      }

      flashMessage.addMultipleByRoute('/order', {
        name,
        email,
        password,
        password_confirmation,
        avatar,
        role_id,
      })

      return response.redirect('/user/' + user_id)
    }

    if (updatedUserId === request.session.user.id) {
      request.session.user = await userModel.getById(updatedUserId)
    }

    flashMessage.add('success', 'Conta editada com sucesso')

    return response.redirect('/user/' + user_id)
  }

  async createUser(request, response) {
    const { name, email, password, password_confirmation, role_id } =
      request.body
    const avatarFile = request.file

    const userModel = new UserModel()
    const roleModel = new RoleModel()
    const createUserService = new CreateUserService(userModel, roleModel)

    const errors = await createUserService.execute({
      name,
      email,
      password,
      password_confirmation,
      role_id,
      avatarFile,
    })

    const flashMessage = new FlashMessage(response.flash)

    if (errors) {
      for (const error of errors) flashMessage.add('error', error)

      flashMessage.addMultipleByRoute('/new-user', { name, email, role_id })

      return response.redirect('/new-user')
    }

    flashMessage.add('success', 'Usuário cadastrado com sucesso')

    response.redirect('/users')
  }

  async deleteUser(request, response) {
    const { user_id } = request.params

    const userModel = new UserModel()

    const deleteOrderService = new DeleteUserService(userModel)

    const error = await deleteOrderService.execute(user_id)

    const flashMessage = new FlashMessage(response.flash)

    if (error) {
      flashMessage.add('error', error)

      response.redirect('/user/' + user_id)
    }

    flashMessage.add('success', 'Usuário deletado com sucesso')

    return response.redirect('/users')
  }
}

module.exports = UsersController
