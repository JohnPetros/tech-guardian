const knex = require('../database')
const ServerError = require('../errors/ServerError')

class User {

  async create({ id, name, email, password }) {
    return knex('users').insert({ id, name, email, password })
  }

  async findByEmail(email) {
    const user = await knex('users').where({ email }).first()

    return user
  }
}

module.exports = User
