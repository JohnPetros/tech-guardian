const yup = require('yup')

const loginValidation = yup.object().shape({
  email: yup
    .string()
    .required('Por favor, insira um e-mail')
    .email('Por favor, insira um e-mail válido'),
  password: yup
    .string()
    .required('Por favor, insira uma senha')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s])[A-Za-z\d\W\S]{6,}$/g,
      'Sua senha deve conter pelo menos uma letra minúscula, uma maiúscula, um dígito e um caractere especial'
    ),
})

const registerValidation = yup.object().shape({
  name: yup
    .string()
    .required('Por favor, insira um nome de usuário')
    .min(3, 'Nome de usuário deve ter pelo menos 3 caracteres'),
  email: yup
    .string()
    .required('Por favor, insira um e-mail')
    .email('Por favor, insira um e-mail válido'),
  password: yup
    .string()
    .required('Por favor, insira uma senha')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s])[A-Za-z\d\W\S]{6,}$/g,
      'Sua senha deve conter pelo menos uma letra minúscula, uma maiúscula, um dígito e um caractere especial'
    ),
  passwordConfirmation: yup
    .string()
    .required('Por favor, confirme sua senha')
    .oneOf([yup.ref('password')], 'Senhas não conferem'),
  roleId: yup.string().required('Por favor, escolha uma função'),
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

  async validateRegister({
    name,
    email,
    password,
    passwordConfirmation,
    roleId,
  }) {
    return this.validate(() =>
      registerValidation.validate(
        { name, email, password, passwordConfirmation, roleId },
        { abortEarly: false }
      )
    )
  }
}

module.exports = Validator
