const yup = require('yup')

const loginValidation = yup.object().shape({
  email: yup.string().required('Por favor, insira um e-mail').email(),
  password: yup
    .string()
    .required('Por favor, insira uma senha')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s])[A-Za-z\d\W\S]{6,}$/g,
      'Sua senha deve conter pelo menos uma letra minúscula, uma maiúscula, um dígito e um caractere especial.'
    ),
})

class Validator {
  async validate(validation) {
    try {
      await validation()
    } catch ({ errors }) {
      return errors
    }
  }

  async validateLogin(email, password) {
    return this.validate(() =>
      loginValidation.validate({ email, password }, { abortEarly: false })
    )
  }
}

module.exports = Validator
