const uuid = require('uuid')

class GetUserByIdService {
  constructor(userModel) {
    this.userModel = userModel
  }

  async execute(userId) {
    if (!uuid.validate(userId)) {
      return 'Usuário não encontrado'
    }

    const user = await this.userModel.getById(userId)

    if (!user) {
      return 'Usuário não encontrado'
    }

    return user
  }
}

module.exports = GetUserByIdService
