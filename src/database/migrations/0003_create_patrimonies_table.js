/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex) => {
  return knex.schema
    .createTable('patrimonies', (table) => {
      table.uuid('id').primary().index()
      table.text('number').unique().index().notNullable()

      table.comment('Tabela destinada para armazenar patrimônios do sistema')
    })
    .then(() => console.log('Created users table'))
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex) => knex.schema.dropTable('patrimonies')
