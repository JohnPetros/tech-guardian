const { Router } = require('express')

const SessionController = require('../controllers/SessionController')

const sessionController = new SessionController()

const loginRouter = Router()

loginRouter.get('/', sessionController.renderLoginPage)

loginRouter.post('/login', sessionController.loginUser)

module.exports = loginRouter
