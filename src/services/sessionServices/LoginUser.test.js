const RoleMock = require('../../mocks/RoleMock')
const UserMock = require('../../mocks/UserMock')
const LoginUserService = require('./LoginUserService')

describe('Login user service', () => {
  let roleMock = null
  let userMock = null
  let loginUserService = null

  beforeEach(() => {
    roleMock = new RoleMock()
    userMock = new UserMock()
    loginUserService = new LoginUserService(userMock, roleMock)
  })

  it('should login user when email and password are correct', async () => {
    const email = 'johndoe@mock.com'
    const password = 'jonhDOE77$'

    const { errors, user } = await loginUserService.execute(email, password)

    expect(errors).toBe(null)
    expect(user).not.toBe(null)
  })

  it('should not login user when email is incorrect', async () => {
    const email = 'johnpetros@mock.com'
    const password = 'jonhDOE77$'

    const { errors, user } = await loginUserService.execute(email, password)

    expect(errors).toEqual(['usuário não encontrado'])
    expect(user).toBe(null)
  })

  it('should not login user when password is incorrect', async () => {
    const email = 'johndoe@mock.com'
    const password = 'jonhDOE88$'

    const { errors, user } = await loginUserService.execute(email, password)

    expect(errors).toEqual(['usuário não encontrado'])
    expect(user).toBe(null)
  })
})
