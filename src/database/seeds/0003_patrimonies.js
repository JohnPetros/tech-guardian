/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex('patrimonies').del()
  await knex('patrimonies').insert([
    {
      id: 'b2737076-dcfe-4d8f-b4b3-76dcafdd99ef',
      number: '147456',
    },
    {
      id: '4ba2af62-552b-4225-b5d8-157f3369e654',
      number: '98746',
    },
    {
      id: '788ac097-d453-4e0d-87c6-3222e87c4a13',
      number: '321789',
    },
    {
      id: '7ce1862b-28d2-4071-b14d-a17bf623bddb',
      number: '741258',
    },
  ])
}
