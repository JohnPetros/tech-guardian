const knex = require('../database')
const ServerError = require('../errors/ServerError')

class User {
  async findByEmail(email) {
    try {
      const user = await knex('users').where({ email }).first()

      return user
    } catch (error) {
      throw new ServerError(error)
    }
  }
}

module.exports = User
