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
}

module.exports = Order
