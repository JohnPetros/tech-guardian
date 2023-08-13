/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex('users').del()
  await knex('users').insert([
    {
      id: 'd1dd8670-e2d9-49d2-9e2b-ac469a4f449b',
      name: 'John Petros',
      email: 'johnpetros@gmail.com',
      password: '$2a$08$JShH7qyuFfvrtgcp0d3QI.1klhCRkKnSzkOPK8XF0tTT0eFF5kRZ6',
      role_id: 'e7b17291-09df-4858-b21b-2c186e219a44'
    },
    {
      id: 'd8418ab2-40b1-435e-b211-1e3c10bd203a',
      name: 'Okabe',
      email: 'okabe@gmail.com',
      password: '$2a$08$xtdk3nVHOmG.p83fkCCJr./2oKz9RSFigmqmf5Pf9z7MUN5sq2r/K',
      role_id: '427bdd37-e893-45d3-bdf5-cc77d9f666db'
    },
    {
      id: 'afd3a3b8-0b16-4870-b52d-20de9e697bdd',
      name: 'Mayuri',
      email: 'mayuri@gmail.com',
      password: '$2a$08$7c8NSubsdsiTIsmRKanUf.kEGwXh5UA7pS8AHcUNchkzgvH68JbAy',
      role_id: '427bdd37-e893-45d3-bdf5-cc77d9f666db'
    },
    {
      id: '4791076c-8229-4012-b675-de371a938513',
      name: 'kurisu',
      email: 'kurisu@gmail.com',
      password: '$2a$08$xq5Rfr8ERmAmDc0hNpYF3.JiVcsKrBcryOb1jpnYfwCIhsU8oN42q',
      role_id: '427bdd37-e893-45d3-bdf5-cc77d9f666db'
    },
  ])
}
