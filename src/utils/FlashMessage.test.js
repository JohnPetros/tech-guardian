const FlashMessage = require('./FlashMessage')

describe('Flash Message', () => {
  let flashMessage = null
  let flashMock = jest.fn()

  beforeEach(() => {
    flashMock.mockReset()
    flashMessage = new FlashMessage(flashMock)
  })

  it('should be able to add a flash message', () => {
    flashMessage.add('error', 'Error message')

    expect(flashMock).toHaveBeenCalledWith('error', 'Error message')
  })

  it('should be able to add multiple flash messages but according to the route', () => {
    flashMessage.addMultipleByRoute('/register', {
      name: 'John Doe',
      email: 'john@example.com',
      password: '123456',
      password_confirmation: '123456',
      role_id: '1ce4c885-40a5-4460-bcf3-25bf48840fd4',
    })

    expect(flashMock).toHaveBeenCalledTimes(3)
    expect(flashMock).toHaveBeenCalledWith('name', 'John Doe')
    expect(flashMock).toHaveBeenCalledWith('email', 'john@example.com')
    expect(flashMock).toHaveBeenCalledWith(
      'role_id',
      '1ce4c885-40a5-4460-bcf3-25bf48840fd4'
    )
  })
})
