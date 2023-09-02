const UserMock = require('../../mocks/UserMock')
const EditUserService = require('./EditUserService')

describe('Edit User Service', () => {
  let userMock = null
  let editUserService = null

  beforeEach(() => {
    userMock = new UserMock()
    editUserService = new EditUserService(userMock)
  })

  it('should not be able to edit a user with a invalid uuid', async () => {
    const userId = '123'

    const result = await editUserService.execute({
      user_id: userId,
    })

    expect(result).toHaveProperty('errors', ['Usuário não encontrado'])
  })

  it('should not be able to edit a user that does not exist', async () => {
    const user = {
      user_id: '2b00179f-dc25-414b-b705-6a07f05321ab',
      name: 'John Doe',
      email: 'john@mock.com',
      role_id: 'e7b17291-09df-4858-b21b-2c186e219a44',
    }

    const result = await editUserService.execute(user)

    expect(result).toHaveProperty('errors', ['Usuário não encontrado'])
  })
})
