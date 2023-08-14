const knex = require('../database')
const ServerError = require('../errors/ServerError')

class Role {
  async execute(method) {
    try {
      return await method()
    } catch (error) {
      throw new ServerError(error)
    }
  }

  async getUnrestrictedRoles() {
    return await this.execute(() =>
      knex.select('id', 'title').from('roles').where({ is_restrict: false })
    )
  }

  async getRoleName(id) {
    return await this.execute(() =>
      knex.select('name').from('roles').where({ id })
    )
  }
}

module.exports = Role
