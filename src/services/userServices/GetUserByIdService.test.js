const UserMock = require('../../mocks/UserMock')
const GetUserByIdService = require('./GetUserByIdService')

describe('Get User By Id Service', () => {
  let userMock = null
  let getUserByIdService = null

  beforeEach(() => {
    userMock = new UserMock()
    getUserByIdService = new GetUserByIdService(userMock)
  })

  it('should not be able to get a user with a invalid uuid', async () => {
    const userId = '123'

    const result = await getUserByIdService.execute(userId)

    expect(result).toBe('Usuário não encontrado')
  })

  it('should not be able to get a user that does not exist', async () => {
    const userId = '732fac5c-1ffe-41cb-963e-cbd71b00abab'

    const result = await getUserByIdService.execute(userId)

    expect(result).toBe('Usuário não encontrado')
  })

  it('should be able to get a user by id', async () => {
    const userId = '31be399e-431e-4237-b7b3-db6b6387c4c5'

    const user = await getUserByIdService.execute(userId)

    expect(user).toEqual(
      expect.objectContaining({
        id: '31be399e-431e-4237-b7b3-db6b6387c4c5',
        name: 'John Doe',
        email: 'johndoe@mock.com',
        avatar: 'default.jpg',
        role: 'tech',
      })
    )
  })
})
