const knex = require('../database')
const ServerError = require('../errors/ServerError')

class Patrimony {
  async execute(method) {
    try {
      return await method()
    } catch (error) {
      throw new ServerError(error)
    }
  }

  async getPatrimonies() {
    return await this.execute(() => knex.from('patrimonies'))
  }
}

module.exports = Patrimony
