const Validator = require('../../utils/Validator')
const File = require('../../utils/File')
const bcrypt = require('bcryptjs')
const uuid = require('uuid')

class EditUserService {
  constructor(userModel) {
    this.userModel = userModel
  }

  async execute({
    user_id,
    name,
    email,
    password,
    password_confirmation,
    avatarFile,
    role_id,
  }) {
    if (!uuid.validate(user_id)) {
      return { errors: ['Usuário não encontrado'], updatedUserId: null }
    }

    const validator = new Validator()

    const errors = await validator.validateUserEdition({
      name,
      email,
      password,
      password_confirmation,
      role_id,
    })

    if (errors) return errors

    const user = await this.userModel.getById(user_id)

    if (!user) {
      return { errors: ['Usuário não encontrado'], updatedUserId: null }
    }

    if (avatarFile) {
      const isImage = avatarFile.mimetype.includes('image')

      if (!isImage) {
        return {
          errors: ['Avatar de usuário deve ser do tipo imagem'],
          updatedUserId: null,
        }
      }

      const file = new File()

      if (avatarFile && user.avatar !== 'default.png') {
        await file.delete('avatars', user.avatar)
      }

      if (avatarFile) {
        await file.save('avatars', avatarFile.filename)
      }
    }

    const updatedUser = await this.userModel.edit({
      id: user_id,
      name,
      email,
      password: password ? await bcrypt.hash(password, 8) : user.password,
      avatar: avatarFile?.filename ?? user.avatar,
      role_id,
    })

    return {
      errors: null,
      updatedUserId: updatedUser[0].id,
    }
  }
}

module.exports = EditUserService
