const uuid = require('uuid')

class DeleteUserService {
  constructor(userModel) {
    this.userModel = userModel
  }

  async execute(id) {
    if (!uuid.validate(id)) {
      return 'Usuário não encontrado'
    }

    const user = await this.userModel.getById(id)

    if (!user) return 'Usuário não encontrado'

    await this.userModel.delete(id)
  }
}

module.exports = DeleteUserService
