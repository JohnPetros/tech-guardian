const RoleMock = require('../../mocks/RoleMock')
const UserMock = require('../../mocks/UserMock')
const RegisterUserService = require('./RegisterUserService')

describe('Register user service', () => {
  let roleMock = null
  let userMock = null
  let registerUser = null

  beforeEach(() => {
    userMock = new UserMock()
    roleMock = new RoleMock()
    registerUser = new RegisterUserService(userMock, roleMock)
  })

  it('should not create user whose email already exists', async () => {
    const input = {
      name: 'john doe',
      email: 'johndoe@mock.com',
      password: 'jonhDOE77$',
      password_confirmation: 'jonhDOE77$',
      role_id: 'ixtxutxouxyil',
    }

    const { errors, user } = await registerUser.execute(input)

    expect(errors).toEqual(['E-mail já em uso'])
    expect(user).toBe(null)
  })

  it('should create user when all input is correct', async () => {
    const input = {
      name: 'john doe',
      email: 'johndoe@mock3.com',
      password: 'jonhDOE77$',
      password_confirmation: 'jonhDOE77$',
      role_id: 'ixtxutxouxyil',
    }

    const { errors, user } = await registerUser.execute(input)

    expect(errors).toBe(null)

    expect(user).toEqual(
      expect.objectContaining({
        name: input.name,
        email: input.email,
        avatar: 'default.jpg',
      })
    )
  })
})
