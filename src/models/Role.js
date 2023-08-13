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
    const roles = await this.execute(() =>
      knex.select('id', 'title').from('roles').where({ is_restrict: false })
    )

    return roles
  }
}

module.exports = Role
