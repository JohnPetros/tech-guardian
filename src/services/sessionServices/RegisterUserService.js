const Validator = require('../../utils/Validator')
const uuid = require('uuid')
const bcrypt = require('bcryptjs')

class RegisterUserService {
  constructor(userModel, roleModel) {
    this.userModel = userModel
    this.roleModel = roleModel
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

    const userAlreadyExist = await this.userModel.getByEmail(email)

    if (userAlreadyExist) {
      return { errors: ['E-mail já em uso'], user: null }
    }

    const hashedPassword = await bcrypt.hash(password, 8)

    const createdUser = await this.userModel.create({
      name,
      email,
      password: hashedPassword,
      roleId,
    })[0]

    const role = await this.roleModel.getTitleById(createdUser.role_id)

    return { errors: null, user: { ...createdUser, role: role.title } }
  }
}

module.exports = RegisterUserService
