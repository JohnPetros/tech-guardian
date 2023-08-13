const MockedUser = require('../../mock/mockedUser')
const RegisterUser = require('./registerUser')

describe('Register user service', () => {
  let mockedUser = null
  let registerUser = null

  beforeEach(() => {
    mockedUser = new MockedUser()
    registerUser = new RegisterUser(mockedUser)
  })

  it('should not create user whose email already exists', async () => {
    const input = {
      name: 'john doe',
      email: 'johndoe@mock.com',
      password: 'jonhDOE77$',
      passwordConfirmation: 'jonhDOE77$',
    }

    const { errors, user } = await registerUser.execute(input)

    expect(errors).toEqual(['E-mail já em uso'])
    expect(user).toBe(null)
  })

  it.only('should create user when all input is correct', async () => {
    const input = {
      name: 'john doe',
      email: 'johndoe@mock3.com',
      password: 'jonhDOE77$',
      passwordConfirmation: 'jonhDOE77$',
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
