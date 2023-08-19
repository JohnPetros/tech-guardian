const MockRole = require('../../mocks/MockRole')
const MockUser = require('../../mocks/mockUser')
const RegisterUser = require('./registerUser')

describe('Register user service', () => {
  let mockRole = null
  let mockUser = null
  let registerUser = null

  beforeEach(() => {
    mockUser = new MockUser()
    mockRole = new MockRole()
    registerUser = new RegisterUser(mockUser, mockRole)
  })

  it('should not create user whose email already exists', async () => {
    const input = {
      name: 'john doe',
      email: 'johndoe@mock.com',
      password: 'jonhDOE77$',
      passwordConfirmation: 'jonhDOE77$',
      roleId: 'ixtxutxouxyil',
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
      passwordConfirmation: 'jonhDOE77$',
      roleId: 'ixtxutxouxyil',
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
