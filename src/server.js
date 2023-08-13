require('express-async-errors')
require('dotenv').config()

const express = require('express')


const handleServerError = require('./middlewares/handleServerError')

const session = require('express-session')

const knex = require('./database')
const KnexSessionStore = require('connect-session-knex')(session)
const store = new KnexSessionStore({ knex })

const server = express()

const path = require('path')

const routes = require('./routes')
const checkSession = require('./middlewares/checkSession')

server.use(express.static('public'))

server.set('view engine', 'ejs')
server.set('views', path.join(__dirname, 'views'))

server.use(express.urlencoded({ extended: false }))

server.use(
  session({
    name: 'tech-guardian@session',
    secret: 'naidrugahtceht',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, maxAge: 1000 * 60 * 60 }, // 1 hour
    store,
  })
)

server.use(routes)

server.use(handleServerError)

server.listen(process.env.PORT ?? 3000, () =>
  console.log(`Server is running on port ${process.env.PORT}`)
)
