const { Router } = require('express')
const loginRouter = require('./login.routes')
require('./login.routes')

const router = Router()

router.use(loginRouter)

module.exports = loginRouter
