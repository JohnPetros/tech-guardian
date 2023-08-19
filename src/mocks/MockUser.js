  class MockUser {
  users = [
    {
      id: '31be399e-431e-4237-b7b3-db6b6387c4c5',
      name: 'John Doe',
      email: 'johndoe@mock.com',
      password: '$2a$08$xMm1PEz8aR0ddE0UCKavk.Ye7eS2gN/VVmQdsC8KXhHuxLwXwyr5C',
      avatar: 'default.jpg',
    },
  ]

  async create({ id, name, email, password }) {
    this.users.push({ id, name, email, password, avatar: 'default.jpg' })

    const createdUser = this.users.find((user) => user.id === id)

    return [
      {
        id: createdUser.id,
        name: createdUser.name,
        email: createdUser.email,
        avatar: createdUser.avatar,
      },
    ]
  }

  async getByEmail(email) {
    const user = this.users.find((user) => user.email === email)

    return user
  }
}

module.exports = MockUser
