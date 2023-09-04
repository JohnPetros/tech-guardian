const knex = require('../database')
const uuid = require('uuid')
const ServerError = require('../errors/ServerError')

class PatrimonyModel {
  limit = 9

  async execute(method) {
    try {
      return await method()
    } catch (error) {
      throw new ServerError(error)
    }
  }

  async getAll({ search = '', page = 1 }) {
    const [{ count }] = await this.execute(() => knex('patrimonies').count())

    const patrimonies = await this.execute(() =>
      knex
        .from('patrimonies')
        .where(knex.raw('lower(number)'), 'like', `%${search.toLowerCase()}%`)
        .limit(this.limit)
        .offset((page - 1) * this.limit)
    )

    return { patrimonies, count }
  }

  async getById(id) {
    return await this.execute(() =>
      knex.from('patrimonies').where({ id }).first()
    )
  }

  async getByNumber(number) {
    return await this.execute(() =>
      knex.from('patrimonies').where({ number }).first()
    )
  }

  async create(number) {
    await this.execute(() =>
      knex.from('patrimonies').insert({
        id: uuid.v4(),
        number,
      })
    )
  }

  async edit(id, number) {
    await this.execute(() =>
      knex
        .from('patrimonies')
        .update({
          number,
        })
        .where({ id })
    )
  }
}

module.exports = PatrimonyModel
