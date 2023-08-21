const knex = require('../database')
const uuid = require('uuid')
const ServerError = require('../errors/ServerError')

class OrderModel {
  async execute(method) {
    try {
      return await method()
    } catch (error) {
      throw new ServerError(error)
    }
  }

  async getAll(isOpen = true) {
    const roles = await this.execute(() =>
      knex
        .select(
          'orders.id',
          'orders.title',
          'orders.created_at',
          'patrimonies.number as patrimony_number',
          'users.name as created_by'
        )
        .from('orders')
        .join('patrimonies', 'patrimonies.id', '=', 'orders.patrimony_id')
        .join('users', 'users.id', '=', 'orders.created_by')
        .where({ is_open: isOpen })
    )

    return roles
  }

  async getById(id) {
    return await this.execute(() =>
      knex
        .select(
          'orders.id',
          'orders.title',
          'orders.created_at',
          'orders.solution',
          'orders.description',
          'orders.is_open',
          'patrimonies.number as patrimony_number',
          'users.id as creator_id',
          'users.name as creator_name',
          'users.avatar as creator_avatar'
        )
        .from('orders')
        .join('patrimonies', 'patrimonies.id', '=', 'orders.patrimony_id')
        .join('users', 'users.id', '=', 'orders.created_by')
        .where('orders.id', id)
        .first()
    )
  }

  async edit({ id, title, description, patrimony_id }) {
    await this.execute(() =>
      knex
        .from('orders')
        .update({
          title,
          description,
          patrimony_id,
        })
        .where({ id })
    )
  }

  async create({ title, description, patrimony_id, user_id }) {
    await this.execute(() =>
      knex.from('orders').insert({
        id: uuid.v4(),
        title,
        description,
        patrimony_id,
        created_by: user_id,
      })
    )
  }

  async delete(id) {
    await this.execute(() => knex.from('orders').del().where({ id }))
  }

  async resolve(id, solution, userId) {
    await this.execute(() =>
      knex
        .from('orders')
        .update({
          is_open: false,
          solution: solution,
          resolved_by: userId,
          resolved_at: new Date(),
        })
        .where({ id })
    )
  }
}

module.exports = OrderModel
