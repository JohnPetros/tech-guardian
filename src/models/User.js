const knex = require('../database')

class User {
  async create({ id, name, email, password }) {
    return knex('users')
      .returning(['id', 'name', 'email', 'avatar'])
      .insert({ id, name, email, password })
  }

  async findByEmail(email) {
    const user = await knex('users').where({ email }).first()

    return user
  }
}

module.exports = User
