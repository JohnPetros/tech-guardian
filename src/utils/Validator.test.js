const Validator = require('./Validator')

describe('Validator', () => {
  let validator = null

  beforeEach(() => {
    validator = new Validator()
  })

  it('should validate incorrect login input', async () => {
    const incorrectEmail = 'incorrectemail.com'
    const incorrectPassword = '123'

    const errors = await validator.validateLogin(
      incorrectEmail,
      incorrectPassword
    )

    expect(errors).toEqual([
      'Por favor, insira um e-mail válido',
      'Sua senha deve conter pelo menos uma letra minúscula, uma maiúscula, um dígito e um caractere especial',
    ])
  })

  it('should validate empty login input', async () => {
    const emptyEmail = ''
    const emptyPassword = ''

    const errors = await validator.validateLogin(emptyEmail, emptyPassword)

    expect(errors).toEqual([
      'Por favor, insira um e-mail',
      'Por favor, insira uma senha',
      'Sua senha deve conter pelo menos uma letra minúscula, uma maiúscula, um dígito e um caractere especial',
    ])
  })

  it('should validate correct login input', async () => {
    const correctEmail = 'johnpetros@gmail.com'
    const correctPassword = 'johnPETROS777$'

    const errors = await validator.validateLogin(correctEmail, correctPassword)

    expect(errors).toBe(undefined)
  })

  it('should validate correct register input', async () => {
    const correctInput = {
      name: 'John Petros',
      email: 'johnpetros@gmial.com',
      password: 'johnPETROS777$',
      password_confirmation: 'johnPETROS777$',
      role_id: 'bc1cebbc-f20e-409d-ad7f-f567490c0953',
    }

    const errors = await validator.validateRegister(correctInput)

    expect(errors).toBe(undefined)
  })

  it('should validate empty register input', async () => {
    const correctInput = {
      name: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      roleId: '',
    }

    const errors = await validator.validateRegister(correctInput)

    expect(errors).toEqual([
      'Por favor, insira um nome de usuário',
      'Nome de usuário deve ter pelo menos 3 caracteres',
      'Por favor, insira um e-mail',
      'Por favor, confirme sua senha',
      'Por favor, insira uma senha',
      'Sua senha deve conter pelo menos uma letra minúscula, uma maiúscula, um dígito e um caractere especial',
      'Por favor, escolha uma função',
    ])
  })

  it('should validate incorrect register input', async () => {
    const correctInput = {
      name: 'jo',
      email: 'johnpetros.com',
      password: '777',
      passwordConfirmation: 'johnPETROS777$',
      roleId: '555',
    }

    const errors = await validator.validateRegister(correctInput)

    expect(errors).toEqual([
      'Nome de usuário deve ter pelo menos 3 caracteres',
      'Por favor, insira um e-mail válido',
      'Por favor, confirme sua senha',
      'Sua senha deve conter pelo menos uma letra minúscula, uma maiúscula, um dígito e um caractere especial',
      'Por favor, escolha uma função',
    ])
  })
})
