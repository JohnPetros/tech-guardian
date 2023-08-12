const express = require('express')

require('express-async-errors')

const handleServerError = require('./middlewares/handleServerError')
const setSession = require('./middlewares/setSession')

const server = express()

const path = require('path')

const routes = require('./routes')

server.use(express.static('public'))

server.set('view engine', 'ejs')
server.set('views', path.join(__dirname, 'views'))

server.use(express.urlencoded({ extended: false }))

server.use(setSession)

server.use(routes)

server.use(handleServerError)

server.listen(3000, () => console.log('Server is Running'))
