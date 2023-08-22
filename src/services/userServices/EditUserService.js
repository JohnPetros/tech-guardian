const Validator = require('../../utils/Validator')
const bcrypt = require('bcryptjs')
const uuid = require('uuid')

class EditUserService {
  constructor(userModel) {
    this.userModel = userModel
  }

  async execute({
    user_id,
    name,
    email,
    password,
    password_confirmation,
    avatar,
    role_id,
  }) {
    if (!uuid.validate(user_id)) {
      return ['Usuário não encontrado']
    }

    const validator = new Validator()

    const errors = await validator.validateUserEdition({
      name,
      email,
      password,
      password_confirmation,
      role_id,
    })


    if (errors) return errors

    const user = await this.userModel.getById(user_id)

    if (!user) {
      return ['Usuário não encontrado']
    }

    await this.userModel.edit({
      id: user_id,
      name,
      email,
      password: password ? await bcrypt.hash(password, 8) : user.password,
      avatar: user.avatar,
      role_id,
    })
  }
}

module.exports = EditUserService
