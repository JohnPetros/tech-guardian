const knex = require('../database')
const uuid = require('uuid')
const ServerError = require('../errors/ServerError')

class UserModel {
  limit = 9

  async execute(method) {
    try {
      return await method()
    } catch (error) {
      throw new ServerError(error)
    }
  }

  async create({ name, email, password, avatar, role_id }) {
    const createdUser = await this.execute(() =>
      knex('users')
        .returning(['id', 'name', 'email', 'avatar', 'role_id'])
        .insert({
          id: uuid.v4(),
          name,
          email,
          password,
          avatar: avatar ?? 'default.png',
          role_id,
        })
    )

    return createdUser
  }

  async getById(id) {
    return await this.execute(() =>
      knex
        .select(
          'users.id',
          'users.name',
          'users.email',
          'users.avatar',
          'users.role_id',
          'roles.title as role'
        )
        .from('users')
        .join('roles', 'roles.id', '=', 'users.role_id')
        .where('users.id', '=', id)
        .first()
    )
  }

  async getByEmail(email) {
    return await this.execute(() => knex('users').where({ email }).first())
  }

  async getAll({ search = '', page = 1, roles_ids = [], sessionUserId }) {
    const [{ count }] = await this.execute(() =>
      knex('users')
        .where(knex.raw('lower(name)'), 'like', `%${search.toLowerCase()}%`)
        .whereNot('users.id', sessionUserId)
        .modify((queryBuilder) => {
          if (roles_ids.length) {
            queryBuilder.whereIn('users.role_id', roles_ids)
          }
        })
        .count()
    )

    const users = await this.execute(() =>
      knex
        .select(
          'users.id',
          'users.name',
          'users.email',
          'users.avatar',
          'roles.title as role'
        )
        .from('users')
        .join('roles', 'roles.id', '=', 'users.role_id')
        .where(knex.raw('lower(name)'), 'like', `%${search.toLowerCase()}%`)
        .whereNot('users.id', sessionUserId)
        .modify((queryBuilder) => {
          if (roles_ids.length) {
            queryBuilder.whereIn('users.role_id', roles_ids)
          }
        })
        .limit(this.limit)
        .offset((page - 1) * this.limit)
    )

    return { users, count }
  }

  async edit({ id, name, email, password, avatar, role_id }) {
    return await this.execute(() =>
      knex
        .from('users')
        .update({
          id,
          name,
          email,
          password,
          avatar,
          role_id,
        })
        .where({ id })
        .returning('id')
    )
  }

  async delete(id) {
    await this.execute(() => knex.from('users').del().where({ id }))
  }
}

module.exports = UserModel
