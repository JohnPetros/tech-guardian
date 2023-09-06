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
      'Sua senha deve conter pelo menos uma letra minúscula, uma maiúscula, um dígito e um caractere especial',
      'Por favor, insira um e-mail válido',
    ])
  })

  it('should validate empty login input', async () => {
    const emptyEmail = ''
    const emptyPassword = ''

    const errors = await validator.validateLogin(emptyEmail, emptyPassword)

    expect(errors).toEqual(
      expect.arrayContaining([
        'Por favor, insira um e-mail',
        'Por favor, insira uma senha',
        'Sua senha deve conter pelo menos uma letra minúscula, uma maiúscula, um dígito e um caractere especial',
      ])
    )
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

    expect(errors).toEqual(
      expect.arrayContaining([
        'Por favor, insira um e-mail',
        'Por favor, insira um nome de usuário',
        'Nome de usuário deve ter pelo menos 3 caracteres',
        'Por favor, confirme sua senha',
        'Por favor, insira uma senha',
        'Sua senha deve conter pelo menos uma letra minúscula, uma maiúscula, um dígito e um caractere especial',
        'Por favor, escolha uma função',
      ])
    )
  })

  it('should validate incorrect register input', async () => {
    const incorrectInput = {
      name: 'jo',
      email: 'johnpetros.com',
      password: 'jonasssss',
      passwordConfirmation: 'não sei',
      roleId: '555',
    }

    const errors = await validator.validateRegister(incorrectInput)

    expect(errors).toEqual(
      expect.arrayContaining([
        'Por favor, insira um e-mail válido',
        'Por favor, confirme sua senha',
        'Sua senha deve conter pelo menos uma letra minúscula, uma maiúscula, um dígito e um caractere especial',
        'Por favor, escolha uma função',
        'Nome de usuário deve ter pelo menos 3 caracteres',
      ])
    )
  })

  it('should not validate passwords when not provided', async () => {
    const user = {
      name: 'John Petros',
      email: 'johnpetros@gmial.com',
      password: 'john',
    }

    const errors = await validator.validateRegister(user)

    expect(errors).toEqual(
      expect.not.arrayContaining([
        'Sua senha deve conter pelo menos uma letra minúscula, uma maiúscula, um dígito e um caractere especial',
        'Senhas não conferem',
      ])
    )
  })

  it('should validate passwords when provided', async () => {
    const user = {
      name: 'John Petros',
      email: 'johnpetros@gmial.com',
      password: 'john',
      password_confirmation: 'johnPETROS',
      role_id: 'bc1cebbc-f20e-409d-ad7f-f567490c0953',
    }

    const errors = await validator.validateRegister(user)

    expect(errors).toEqual(
      expect.arrayContaining([
        'Sua senha deve conter pelo menos uma letra minúscula, uma maiúscula, um dígito e um caractere especial',
        'Senhas não conferem',
      ])
    )
  })

  it('should validate incorrect order', async () => {
    const order = {
      title: '',
      description: '',
      patrimony_id: '',
    }

    const errors = await validator.validateOrder(order)

    expect(errors).toEqual(
      expect.arrayContaining([
        'Uma solicitação deve conter um título',
        'Uma solicitação deve conter uma breve descrição do problema',
        'Uma solicitção deve estar associado a um patrimônio',
      ])
    )
  })

  it('should validate incorrect patrimony number', async () => {
    const patrimonyNumber = '5555555555555555'

    const errors = await validator.validatePatrimonyNumber(patrimonyNumber)

    expect(errors).toEqual(
      expect.arrayContaining([
        'Número de patrimônio deve conter exatamente seis números',
      ])
    )
  })
})
