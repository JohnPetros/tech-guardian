const knex = require('../database')
const ServerError = require('../errors/ServerError')

class PatrimonyModel {
  async execute(method) {
    try {
      return await method()
    } catch (error) {
      throw new ServerError(error)
    }
  }

  async getAll() {
    return await this.execute(() => knex.from('patrimonies'))
  }

  async getById(id) {
    return await this.execute(() =>
      knex.from('patrimonies').where({ id }).first()
    )
  }
}

module.exports = PatrimonyModel
