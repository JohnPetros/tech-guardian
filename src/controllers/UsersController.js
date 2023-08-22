const UserModel = require('../models/UserModel')
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

    console.log(user);

    response.render('pages/user.ejs', {
      user,
    })
  }
}

module.exports = UsersController
