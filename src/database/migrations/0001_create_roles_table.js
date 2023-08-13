/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex) => {
  return knex.schema
    .createTable('roles', (table) => {
      table.uuid('id').primary().index()
      table.text('title').unique().index().notNullable()
      table.boolean('is_restrict').notNullable()

      table.comment(
        'Tabela destinada para armazenar as função de usuário do sistema'
      )
    })
    .then(() => console.log('Created roles table'))
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex) => knex.schema.dropTable('roles')
