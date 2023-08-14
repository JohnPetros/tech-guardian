const Validator = require('../../utils/Validator')
const uuid = require('uuid')
const bcrypt = require('bcryptjs')

class RegisterUser {
  constructor(user, role) {
    this.user = user
    this.role = role
  }

  async execute({ name, email, password, passwordConfirmation, roleId }) {
    const validator = new Validator()

    const errors = await validator.validateRegister({
      name,
      email,
      password,
      passwordConfirmation,
      roleId,
    })

    if (errors) {
      return { errors, user: null }
    }

    const userAlreadyExist = await this.user.getByEmail(email)

    if (userAlreadyExist) {
      return { errors: ['E-mail já em uso'], user: null }
    }

    const hashedPassword = await bcrypt.hash(password, 8)

    const createdUser = await this.user.create({
      id: uuid.v4(),
      name,
      email,
      password: hashedPassword,
      roleId,
    })

    const roleName = await this.role.getRoleName(createdUser[0].roleId)

    return { errors: null, user: { ...createdUser[0], role: roleName } }
  }
}

module.exports = RegisterUser
