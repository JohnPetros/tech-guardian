const Validator = require('../../utils/Validator')
const bcryptjs = require('bcryptjs')

class LoginUserService {
  constructor(userModel, roleModel) {
    this.userModel = userModel
    this.roleModel = roleModel
  }

  async execute(email, password) {
    const validator = new Validator()

    const errors = await validator.validateLogin(email, password)

    if (errors) {
      return { errors, user: null }
    }

    const user = await this.userModel.getByEmail(email)

    if (!user) {
      return { errors: ['usuário não encontrado'], user: null }
    }

    const isPasswordCorrect = await bcryptjs.compare(password, user.password)

    if (!isPasswordCorrect) {
      return { errors: ['usuário não encontrado'], user: null }
    }

    const roleTitle = await this.roleModel.getRoleTitleById(user.role_id)

    return { errors: null, user: { ...user, role: roleTitle } }
  }
}

module.exports = LoginUserService
