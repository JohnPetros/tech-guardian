/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex) => {
  return knex.schema.alterTable('users', (table) => {
    table.string('avatar').notNullable().defaultTo('default.png')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex) => {
  return knex.schema.table('orders', (table) => {
    table.dropColumn('avatar')
  })
}
