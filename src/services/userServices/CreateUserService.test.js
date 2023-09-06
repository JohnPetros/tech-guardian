const UserMock = require('../../mocks/UserMock')
const CreateUserService = require('./CreateUserService')

describe('Create User Service', () => {
  let userMock = null
  let createUserService = null

  beforeEach(() => {
    userMock = new UserMock()
    createUserService = new CreateUserService(userMock)
  })

  it('should not be able to create a user whose email already exists', async () => {
    const user = {
      name: 'John',
      email: 'john@example.com',
      password: 'jonhDOE77$',
      password_confirmation: 'jonhDOE77$',
      role_id: 'ixtxutxouxyil',
    }

    await createUserService.execute(user)

    const errors = await createUserService.execute(user)

    expect(errors).toEqual(['E-mail já em uso'])
  })
})
