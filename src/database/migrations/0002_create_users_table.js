/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex) => {
  return knex.schema
    .createTable('users', (table) => {
      table.uuid('id').primary().index()
      table.text('name').notNullable().checkLength('>=', 3)
      table.text('email').index().unique().notNullable()
      table.text('password').notNullable().checkLength('>', 6)
      table.text('avatar').notNullable().defaultTo('default.jpg')

      table
        .uuid('role_id')
        .notNullable()
        .references('id')
        .inTable('roles')
        .onDelete('RESTRICT')

      table.comment('Tabela destinada para armazenar usuários do sistema')
    })
    .then(() => console.log('Created users table'))
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex) => knex.schema.dropTable('users')
