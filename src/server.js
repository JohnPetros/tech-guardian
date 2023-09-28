require('express-async-errors')
require('dotenv').config()

const express = require('express')
const session = require('express-session')
const flash = require('express-flash-message').default

const handleServerError = require('./middlewares/handleServerError')
const checkSession = require('./middlewares/checkSession')

const knex = require('./database')
const KnexSessionStore = require('connect-session-knex')(session)
const store = new KnexSessionStore({ knex })

const server = express()

const path = require('path')

const routes = require('./routes')

server.use(express.static('public'))

server.set('view engine', 'ejs')
server.engine('ejs', ejs)
server.set('views', path.join(__dirname, 'views'))

server.use(express.urlencoded({ extended: false }))

server.use(
  session({
    name: 'tech-guardian@session',
    secret: 'naidrugahtceht',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, maxAge: 1000 * 60 * 60 * 24 * 30 }, // 30 days
    store,
  })
)

server.use(
  flash({
    sessionKeyName: 'techguardian-flash-message',
  })
)

server.use(checkSession)

server.use(routes)

server.use(handleServerError)

server.listen(process.env.PORT ?? 3333, () =>
  console.log(`Server is running on port ${process.env.PORT}`)
)
