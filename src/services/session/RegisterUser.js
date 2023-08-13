const User = require('../../models/user')
const Validator = require('../../utils/Validator')
const uuid = require('uuid')
const bcrypt = require('bcryptjs')

class RegisterUser {
  async execute({ name, email, password, passwordConfirmation }) {
    const validator = new Validator()

    const errors = await validator.validateRegister({
      name,
      email,
      password,
      passwordConfirmation,
    })

    if (errors) {
      return { errors, user: null }
    }

    const user = new User()

    const userAlreadyExist = await user.findByEmail(email)

    if (userAlreadyExist) {
      return { errors: ['E-mail já em uso'], user: null }
    }

    const hashedPassword = await bcrypt.hash(password, 8)

    const createdUser = await user.create({
      id: uuid.v4(),
      name,
      email,
      password: hashedPassword,
    })

    return { errors: null, user: createdUser[0] }
  }
}

module.exports = RegisterUser
