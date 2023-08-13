const User = require('../../models/user')
const Validator = require('../../utils/Validator')
const bcryptjs = require('bcryptjs')

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

    const isPasswordCorrect = await bcryptjs.compare(password, user.password)

    if (!isPasswordCorrect) {
      return { errors: ['usuário não encontrado'], user: null }
    }

    console.log(user);


    return { errors: null, user }
  }
}

module.exports = LoginUser
