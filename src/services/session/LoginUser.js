const User = require('../../models/user')
const Validator = require('../../utils/Validator')

class LoginUser {
  async execute(email, password) {
    const validator = new Validator()

    const errors = await validator.validateLogin(email, password)

    if (errors) {
      return { errors, user: null }
    }

    const user = await new User().findByEmail(email)

    if (!user) {
      return { errors: ['usuário não encontrado'], user: null }
    }

    if (!user.password) {
      return { errors: ['usuário não encontrado'], user: null }
    }

    return { errors: null, user }
  }
}

module.exports = LoginUser
