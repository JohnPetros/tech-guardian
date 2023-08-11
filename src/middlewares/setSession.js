const session = require('express-session')

const knex = require('../database')
const KnexSessionStore = require('connect-session-knex')(session)

function setSession() {
  const store = new KnexSessionStore({ knex })

  return session({
    secret: 'naidrugahtceht',
    resave: false,
    saveUninitialized: false,
    store,
  })
}

module.exports = setSession