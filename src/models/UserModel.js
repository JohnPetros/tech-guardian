const knex = require('../database')
const uuid = require('uuid')
const ServerError = require('../errors/ServerError')

class UserModel {
  async execute(method) {
    try {
      return await method()
    } catch (error) {
      throw new ServerError(error)
    }
  }

  async create({ name, email, password, role_id }) {
    const createdUser = await this.execute(() =>
      knex('users')
        .returning(['id', 'name', 'email', 'avatar', 'role_id'])
        .insert({ id: uuid.v4(), name, email, password, role_id })
    )

    return createdUser
  }

  async getById(id) {
    return await this.execute(() =>
      knex
        .select('id', 'name', 'email', 'avatar', 'role_id')
        .from('users')
        .where({ id })
        .first()
    )
  }

  async getByEmail(email) {
    return await this.execute(() => knex('users').where({ email }).first())
  }

  async edit({ id, name, email, password, avatar, role_id }) {
    await this.execute(() =>
      knex
        .from('users')
        .update({
          id,
          name,
          email,
          password,
          avatar,
          role_id,
        })
        .where({ id })
    )
  }
}

module.exports = UserModel
