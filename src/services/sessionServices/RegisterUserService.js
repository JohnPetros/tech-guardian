const Validator = require('../../utils/Validator')
const bcrypt = require('bcryptjs')

class RegisterUserService {
  constructor(userModel, roleModel) {
    this.userModel = userModel
    this.roleModel = roleModel
  }

  async execute({ name, email, password, password_confirmation, role_id }) {
    const validator = new Validator()

    const errors = await validator.validateUser({
      name,
      email,
      password,
      password_confirmation,
      role_id,
    })

    if (errors) {
      return { errors, user: null }
    }

    const user = await this.userModel.getByEmail(email)

    if (user) {
      return { errors: ['E-mail já em uso'], user: null }
    }

    const hashedPassword = await bcrypt.hash(password, 8)

    const [createdUser] = await this.userModel.create({
      name,
      email,
      password: hashedPassword,
      role_id,
    })

    const role = await this.roleModel.getTitleById(createdUser.role_id)

    return { errors: null, user: { ...createdUser, role: role.title } }
  }
}

module.exports = RegisterUserService
