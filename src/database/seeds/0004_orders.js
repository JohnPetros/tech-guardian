/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex('orders').del()
  await knex('orders').insert([
    {
      id: '4cc25e5e-0833-4cbf-b9f4-f53f15975364',
      title: 'Computador não liga',
      patrimony_id: '7ce1862b-28d2-4071-b14d-a17bf623bddb',
      created_by: 'd8418ab2-40b1-435e-b211-1e3c10bd203a',
    },
    {
      id: '4b9e04a8-23cd-4830-aa52-5515af693b3c',
      title: 'Impressora não imprime',
      patrimony_id: '4ba2af62-552b-4225-b5d8-157f3369e654',
      created_by: 'd8418ab2-40b1-435e-b211-1e3c10bd203a',
    },
    {
      id: '08d38df3-d121-4d81-937c-a213e06b66df',
      title: 'Torradeira queimou',
      patrimony_id: '788ac097-d453-4e0d-87c6-3222e87c4a13',
      created_by: '4791076c-8229-4012-b675-de371a938513',
    },
    {
      id: '08d38df3-d121-4d81-555d-a213e06b66df',
      title: 'Na minha máquina funciona',
      patrimony_id: '788ac097-d453-4e0d-87c6-3222e87c4a13',
      created_by: 'd8418ab2-40b1-435e-b211-1e3c10bd203a',
    },
  ])
}
