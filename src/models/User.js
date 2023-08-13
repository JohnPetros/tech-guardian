const knex = require('../database')

class User {
  async execute(method) {
    try {
      return await method()
    } catch (error) {
      throw new ServerError(error)
    }
  }

  async create({ id, name, email, password }) {
    const createdUser = await this.execute(() =>
      knex('users')
        .returning(['id', 'name', 'email', 'avatar'])
        .insert({ id, name, email, password })
    )

    return createdUser
  }

  async findByEmail(email) {
    const user = await this.execute(() =>
      knex('users').where({ email }).first()
    )

    return user
  }
}

module.exports = User
