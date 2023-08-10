const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')
const routes = require('./routes')
const path = require('path')

const server = express()

server.use(express.static('public'))

server.use(
  session({
    secret: 'naidrugahtceht',
    resave: false,
    saveUninitialized: true,
  })
)

server.set('view engine', 'ejs')
server.set('views', path.join(__dirname, 'views'))

server.use(express.urlencoded({ extended: false }))

server.use(routes)

server.listen(3000, () => console.log('Server is Running'))
