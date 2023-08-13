/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex) => {
  return knex.schema
    .createTable('orders', (table) => {
      table.uuid('id').primary().index()
      table.boolean('is_open').notNullable().defaultTo(false)
      table.text('description', 'longtext')
      table.text('solution', 'longtext')
      table.timestamp('created_at').notNullable().defaultTo(knex.fn.now())

      table
        .uuid('patrimony_id')
        .notNullable()
        .references('id')
        .inTable('patrimonies')
        .onDelete('CASCADE')

      table
        .uuid('created_by')
        .references('id')
        .inTable('users')
        .notNullable()
        .onDelete('CASCADE')

      table
        .uuid('resolved_by')
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')

      table.comment('Tabela destinada para armazenar os chamados do sistema')
    })
    .then(() => console.log('Created orders table'))
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex) => knex.schema.dropTable('orders')
