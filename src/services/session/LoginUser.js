const Validator = require('../../utils/Validator')
const bcryptjs = require('bcryptjs')

class LoginUser {
  constructor(user, role) {
    this.user = user
    this.role = role
  }

  async execute(email, password) {
    const validator = new Validator()

    const errors = await validator.validateLogin(email, password)

    if (errors) {
      return { errors, user: null }
    }

    const user = await this.user.getByEmail(email)

    if (!user) {
      return { errors: ['usuário não encontrado'], user: null }
    }

    const isPasswordCorrect = await bcryptjs.compare(password, user.password)

    if (!isPasswordCorrect) {
      return { errors: ['usuário não encontrado'], user: null }
    }

    const roleName = await this.role.getRoleName(user.roleId)

    return { errors: null, user: { ...user, role: roleName } }
  }
}

module.exports = LoginUser
