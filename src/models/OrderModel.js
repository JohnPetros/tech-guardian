const knex = require('../database')
const uuid = require('uuid')
const ServerError = require('../errors/ServerError')

class OrderModel {
  limit = 9

  async execute(method) {
    try {
      return await method()
    } catch (error) {
      throw new ServerError(error)
    }
  }

  async getAll({
    isOpen = true,
    search = '',
    patrimonies_ids = [],
    date,
    page = 1,
  }) {
    const [ordersAmount] = await this.execute(() =>
      knex('orders')
        .where({ is_open: isOpen })
        .where(knex.raw('lower(title)'), 'like', `%${search.toLowerCase()}%`)
        .modify((queryBuilder) => {
          if (patrimonies_ids.length) {
            queryBuilder.whereIn('orders.patrimony_id', patrimonies_ids)
          }
        })
        .count()
    )

    const orders = await this.execute(() =>
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
        .where(knex.raw('lower(title)'), 'like', `%${search.toLowerCase()}%`)
        .modify((queryBuilder) => {
          if (patrimonies_ids.length) {
            queryBuilder.whereIn('orders.patrimony_id', patrimonies_ids)
          }

          const isValidDate = /^\d{4}-\d{2}-\d{2}$/.test(date)

          if (isValidDate) {
            queryBuilder.whereRaw('date(orders.created_at) = ?', [date])
          }
        })
        .limit(this.limit)
        .offset((page - 1) * this.limit)
        .orderBy('created_at', 'desc')
    )

    return { orders, count: ordersAmount.count }
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
          'orders.patrimony_id',
          'orders.is_open',
          'orders.resolved_at',
          'orders.resolved_by',
          'patrimonies.number as patrimony_number',
          'creator.id as creator_id',
          'creator.name as creator_name',
          'creator.avatar as creator_avatar',
          'resolver.id as resolver_id',
          'resolver.name as resolver_name',
          'resolver.avatar as resolver_avatar'
        )
        .from('orders')
        .join('patrimonies', 'patrimonies.id', '=', 'orders.patrimony_id')
        .join('users as creator', 'creator.id', '=', 'orders.created_by')
        .leftJoin('users as resolver', 'resolver.id', '=', 'orders.resolved_by')
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

  async resolve(id, userId, solution) {
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

  async reopen(id) {
    console.log(id);
    await this.execute(() =>
      knex
        .from('orders')
        .update({
          is_open: true,
        })
        .where({ id })
    )
  }
}

module.exports = OrderModel
