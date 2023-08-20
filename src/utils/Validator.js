const yup = require('yup')

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s])[A-Za-z\d\W\S]{6,}$/g

const loginValidation = yup.object().shape({
  email: yup
    .string()
    .required('Por favor, insira um e-mail')
    .email('Por favor, insira um e-mail válido'),
  password: yup
    .string()
    .required('Por favor, insira uma senha')
    .matches(
      passwordRegex,
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
      passwordRegex,
      'Sua senha deve conter pelo menos uma letra minúscula, uma maiúscula, um dígito e um caractere especial'
    ),
  passwordConfirmation: yup
    .string()
    .required('Por favor, confirme sua senha')
    .oneOf([yup.ref('password')], 'Senhas não conferem'),
  roleId: yup.string().required('Por favor, escolha uma função'),
})

const orderValidation = yup.object().shape({
  title: yup.string().required('Uma solicitação deve ter um título'),
  description: yup
    .string()
    .required('Uma solicitação deve ter uma breve descrição do problema'),
  patrimony_id: yup
    .string()
    .required('Uma solicitção deve estar associado a um patrimônio'),
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

  async validateOrder({ title, description, patrimony_id, user_id }) {
    return this.validate(() =>
      orderValidation.validate({
        title,
        description,
        patrimony_id,
      })
    )
  }
}

module.exports = Validator
