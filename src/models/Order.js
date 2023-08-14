const knex = require('../database')
const ServerError = require('../errors/ServerError')

class Order {
  async execute(method) {
    try {
      return await method()
    } catch (error) {
      throw new ServerError(error)
    }
  }

  async getOrders(isOpen = true) {
    const roles = await this.execute(() =>
      knex
        .select(
          'orders.id',
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

  async getOrderById(id) {
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
        .where('orders.id', id).first()
    )
  }
}

module.exports = Order
