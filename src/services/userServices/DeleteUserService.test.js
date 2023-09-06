const UserMock = require('../../mocks/UserMock')
const RoleMock = require('../../mocks/RoleMock')
const DeleteUserService = require('./DeleteUserService')
const RegisterUserService = require('../sessionServices/RegisterUserService')

describe('Delete User Service', () => {
  let userMock = null
  let deleteUserService = null

  beforeEach(() => {
    userMock = new UserMock()
    deleteUserService = new DeleteUserService(userMock)
  })

  it('should not be able to delete a user with a invalid uuid', async () => {
    const userId = 'invalid uuid'

    await deleteUserService.execute(userId)

    const errors = await deleteUserService.execute(userId)

    expect(errors).toEqual('Usuário não encontrado')
  })

  it('should not be able to delete a user that does not exist', async () => {
    const userId = 'b8d7be88-6983-4a92-bcfd-11c591de73fa'

    await deleteUserService.execute(userId)

    const errors = await deleteUserService.execute(userId)

    expect(errors).toEqual('Usuário não encontrado')
  })

  it('should be able to delete a user', async () => {
    const user = {
      name: 'John',
      email: 'john@example.com',
      password: 'jonhDOE77$',
      password_confirmation: 'jonhDOE77$',
      role_id: 'ixtxutxouxyil',
    }

    const roleMock = new RoleMock()
    const registerUserService = new RegisterUserService(userMock, roleMock)

    const { user: createdUser } = await registerUserService.execute(user)

    await deleteUserService.execute(createdUser.id)

    const deletedUser = await userMock.getById(createdUser.email)

    expect(deletedUser).toBe(undefined)
  })
})
