const MockedUser = require('../../mock/mockedUser')
const LoginUser = require('./LoginUser')

describe('Login user service', () => {
  let mockedUser = null
  let loginUser = null

  beforeEach(() => {
    mockedUser = new MockedUser()
    loginUser = new LoginUser(mockedUser)
  })

  it('should login user when email and password are correct', async () => {
    const email = 'johndoe@mock.com'
    const password = 'jonhDOE77$'

    const { errors, user } = await loginUser.execute(email, password)

    expect(errors).toBe(null)
    expect(user).not.toBe(null)
  })

  it('should not login user when email is incorrect', async () => {
    const email = 'johnpetros@mock.com'
    const password = 'jonhDOE77$'

    const { errors, user } = await loginUser.execute(email, password)

    expect(errors).toEqual(['usuário não encontrado'])
    expect(user).toBe(null)
  })

  it.only('should not login user when password is incorrect', async () => {
    const email = 'johndoe@mock.com'
    const password = 'jonhDOE88$'

    const { errors, user } = await loginUser.execute(email, password)

    expect(errors).toEqual(['usuário não encontrado'])
    expect(user).toBe(null)
  })
})
