require('dotenv').config()
const path = require('path')


/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
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
  },
  production: {
    client: process.env.DATABASE_CLIENT,
    connection: process.env.DATABASE_URL,
    migrations: {
      tableName: 'knex_migrations',
      directory: path.resolve(__dirname, 'src', 'database', 'migrations'),
    },
    pool: {
      max: 3,
      min: 0,
      idleTimeoutMillis: 1000,
    },
    useNullAsDefault: true,
  },
}
