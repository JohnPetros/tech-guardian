const environment = process.env.ENVIRONMENT;
const knexConfig = require("../../knexfile");
const knex = require("knex")(knexConfig.development)

module.exports = knex