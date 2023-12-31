const yup = require('yup')

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s])[A-Za-z\d\W\S]{6,}$/g

const nameValidation = yup.object().shape({
  name: yup
    .string()
    .required('Por favor, insira um nome de usuário')
    .min(3, 'Nome de usuário deve ter pelo menos 3 caracteres'),
})

const emailValidation = yup.object().shape({
  email: yup
    .string()
    .required('Por favor, insira um e-mail')
    .email('Por favor, insira um e-mail válido'),
})

const passwordValidation = yup.object().shape({
  password: yup
    .string()
    .required('Por favor, insira uma senha')
    .matches(
      passwordRegex,
      'Sua senha deve conter pelo menos uma letra minúscula, uma maiúscula, um dígito e um caractere especial'
    ),
  password_confirmation: yup
    .string()
    .required('Por favor, confirme sua senha')
    .oneOf([yup.ref('password')], 'Senhas não conferem'),
})

const roleValidation = yup.object().shape({
  role_id: yup.string().required('Por favor, escolha uma função'),
})

const loginValidation = emailValidation.concat(
  yup.object().shape({
    password: passwordValidation.fields.password,
  })
)

const userValidation = nameValidation
  .concat(emailValidation)
  .concat(passwordValidation)
  .concat(roleValidation)

const userEditionValidation = nameValidation
  .concat(emailValidation)
  .concat(roleValidation)
  .concat(
    yup.object().shape(
      {
        password: yup
          .string()
          .nullable()
          .notRequired()
          .when('password', {
            is: (value) => value?.length,
            then: passwordValidation.fields.password,
          }),
        password_confirmation: yup
          .string()
          .nullable()
          .notRequired()
          .when('password_confirmation', {
            is: (value) => value?.length,
            then: passwordValidation.fields.password_confirmation,
          }),
      },
      [
        ['password', 'password'],
        ['password_confirmation', 'password_confirmation'],
      ]
    )
  )

const orderValidation = yup.object().shape({
  title: yup.string().required('Uma solicitação deve conter um título'),
  description: yup
    .string()
    .required('Uma solicitação deve conter uma breve descrição do problema'),
  patrimony_id: yup
    .string()
    .required('Uma solicitção deve estar associado a um patrimônio'),
})

const patrimonyNumberValidation = yup.object().shape({
  number: yup
    .string()
    .required('Patrimônio deve ser associado a um número')
    .test(
      'len',
      'Número de patrimônio deve conter exatamente seis números',
      (number) => number.toString().length === 6
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

  async validateUser({
    name,
    email,
    password,
    password_confirmation,
    role_id,
  }) {
    return this.validate(() =>
      userValidation.validate(
        { name, email, password, password_confirmation, role_id },
        { abortEarly: false }
      )
    )
  }

  async validateOrder({ title, description, patrimony_id }) {
    return this.validate(() =>
      orderValidation.validate(
        {
          title,
          description,
          patrimony_id,
        },
        { abortEarly: false }
      )
    )
  }

  async validatePatrimonyNumber(number) {
    return this.validate(() =>
      patrimonyNumberValidation.validate(
        {
          number,
        },
        { abortEarly: false }
      )
    )
  }

  async validateUserEdition({
    name,
    email,
    password,
    password_confirmation,
    role_id,
  }) {
    return this.validate(() =>
      userEditionValidation.validate({
        name,
        email,
        password,
        password_confirmation,
        role_id,
      })
    )
  }
}

module.exports = Validator
