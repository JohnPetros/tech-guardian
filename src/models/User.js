const knex = require('../database')
const ServerError = require('../errors/ServerError')

class User {
  async execute(method) {
    try {
      return await method()
    } catch (error) {
      throw new ServerError(error)
    }
  }

  async create({ id, name, email, password, roleId }) {
    const createdUser = await this.execute(() =>
      knex('users')
        .returning(['id', 'name', 'email', 'avatar', 'role_id'])
        .insert({ id, name, email, password, role_id: roleId })
    )

    return createdUser
  }

  async getByEmail(email) {
    const user = await this.execute(() =>
      knex('users').where({ email }).first()
    )

    return user
  }
}

module.exports = User
