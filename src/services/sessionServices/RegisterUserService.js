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
      id: uuid.v4(),
      name,
      email,
      password: hashedPassword,
      roleId,
    })

    console.log(this.roleModel);
    const roleName = await this.roleModel.getRoleNameById(createdUser[0].roleId)

    return { errors: null, user: { ...createdUser[0], role: roleName } }
  }
}

module.exports = RegisterUserService
