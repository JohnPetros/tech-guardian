const User = require('../../models/user')
const Validator = require('../../utils/Validator')
const uuid = require('uuid')

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

    const userModel = new User()

    const userAlreadyExist = await userModel.findByEmail(email)

    console.log(userAlreadyExist)

    if (userAlreadyExist) {
      return { errors: ['E-mail já em uso'], user: null }
    }

    const user = userModel.create({
      id: uuid.v4(),
      name,
      email,
      password,
    })

    return { errors: null, user: user }
  }
}

module.exports = RegisterUser
