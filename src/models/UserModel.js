const knex = require('../database')
const ServerError = require('../errors/ServerError')

class UserModel {
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
    return await this.execute(() => knex('users').where({ email }).first())
  }
}

module.exports = UserModel