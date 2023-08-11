const path = require('path')

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: 'pg',
    connection:
      'postgres://ezwobmqa:wTGTj5kLei2zR8_8GvM2RYn6HIdXgWSP@mouse.db.elephantsql.com/ezwobmqa',
    migrations: {
      tableName: 'knex_migrations',
      directory: path.resolve(__dirname, 'src', 'database', 'migrations'),
    },
    seeds: {
      directory: path.resolve(__dirname, 'src', 'database', 'seeds'),
    },
    // pool: {
    //   afterCreate: (connection, callback) => {
    //     connection.run('PRAGMA foreign_keys=ON', callback)
    //   },
    // },
    useNullAdsDefault: true,
  },
}
