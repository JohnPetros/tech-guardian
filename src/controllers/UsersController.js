const RoleModel = require('../models/RoleModel')
const UserModel = require('../models/UserModel')
const EditUserService = require('../services/userServices/EditUserService')
const GetUserByIdService = require('../services/userServices/GetUserByIdService')
const FlashMessage = require('../utils/FlashMessage')

class UsersController {
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

    const roles = await roleModel.getUnrestrictedOnes()

    response.render('pages/user.ejs', {
      user,
      roles,
    })
  }

  async editUser(request, response) {
    const { user_id } = request.params
    const { name, email, password, password_confirmation, avatar, role_id } =
      request.body

    const userModel = new UserModel()

    const editOderService = new EditUserService(userModel)

    const errors = await editOderService.execute({
      user_id,
      name,
      email,
      password,
      password_confirmation,
      avatar,
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

    flashMessage.add('success', 'Conta editada com sucesso')

    return response.redirect('/user/' + user_id)
  }
}

module.exports = UsersController
