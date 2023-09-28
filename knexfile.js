require('dotenv').config()
const path = require('path')

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  client: process.env.DATABASE_CLIENT,
  connection: process.env.DATABASE_URL,

  migrations: {
    tableName: 'knex_migrations',
    directory: path.resolve(__dirname, 'src', 'database', 'migrations'),
  },
  seeds: {
    directory: path.resolve(__dirname, 'src', 'database', 'seeds'),
  },
  useNullAdsDefault: true,
  pool: {
    max: 3,
    min: 0,
    idleTimeoutMillis: 1000,
  },
}
