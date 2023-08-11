/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex) =>
  knex.schema.createTable('users', (table) => {
    table.increments('id')
    table.text('name').unique().notNullable()
    table.text('email').unique().notNullable()
    table.text('password').unique().notNullable()
    table.text('avatar').default('default.jpg')
  })

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex) => knex.schema.dropTable('users')
