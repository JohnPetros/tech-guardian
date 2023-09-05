const knex = require('../database')
const ServerError = require('../errors/ServerError')

class RoleModel {
  async execute(method) {
    try {
      return await method()
    } catch (error) {
      throw new ServerError(error)
    }
  }

  async getAll() {
    return await this.execute(() =>
      knex.select('id', 'title').from('roles')
    )
  }

  async getUnrestrictedOnes() {
    return await this.execute(() =>
      knex.select('id', 'title').from('roles').where({ is_restrict: false })
    )
  }

  async getTitleById(id) {
    return await this.execute(() =>
      knex.select('title').from('roles').where({ id }).first()
    )
  }
}

module.exports = RoleModel
