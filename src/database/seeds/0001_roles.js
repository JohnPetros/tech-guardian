/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex('roles').del()
  await knex('roles').insert([
    {
      id: '427bdd37-e893-45d3-bdf5-cc77d9f666db',
      title: 'tech',
      is_restrict: false,
    },
    {
      id: 'e7b17291-09df-4858-b21b-2c186e219a44',
      title: 'guardian',
      is_restrict: false,
    },
    {
      id: '828a3599-3fe6-48d3-a637-9036df358cd2',
      title: 'admin',
      is_restrict: true,
    },
  ])
}
