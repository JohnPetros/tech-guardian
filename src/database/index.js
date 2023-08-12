require("dotenv").config();

const environment = process.env.ENVIRONMENT;
const knexConfig = require("../../knexfile");
const knex = require("knex")(knexConfig[environment])

module.exports = knex