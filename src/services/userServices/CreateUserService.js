const Validator = require('../../utils/Validator')
const File = require('../../utils/File')
const bcrypt = require('bcryptjs')

class CreateUserService {
  constructor(userModel) {
    this.userModel = userModel
  }

  async execute({
    name,
    email,
    password,
    password_confirmation,
    avatarFile,
    role_id,
  }) {
    const validator = new Validator()

    const errors = await validator.validateUser({
      name,
      email,
      password,
      password_confirmation,
      role_id,
    })

    if (errors) return errors

    const user = await this.userModel.getByEmail(email)

    if (user) {
      return ['E-mail já em uso']
    }

    if (avatarFile) {
      const isImage = avatarFile.mimetype.includes('image')

      if (!isImage) {
        return {
          errors: ['Avatar de usuário deve ser do tipo imagem'],
          createdtedUserId: null,
        }
      }

      if (avatarFile) {
        const file = new File()

        await file.save('avatars', avatarFile.filename)
      }
    }

    await this.userModel.create({
      name,
      email,
      password: await bcrypt.hash(password, 8),
      avatar: avatarFile?.filename ?? 'default.png',
      role_id,
    })
  }
}

module.exports = CreateUserService
