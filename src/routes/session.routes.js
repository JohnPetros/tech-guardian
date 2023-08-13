const { Router } = require('express')

const SessionController = require('../controllers/SessionController')

const sessionController = new SessionController()

const loginRouter = Router()

loginRouter.get('/', sessionController.renderLoginPage)

loginRouter.post('/login-user', sessionController.loginUser)

loginRouter.get('/register', sessionController.renderRegisterPage)

loginRouter.post('/register-user', sessionController.registerUser)

loginRouter.get('/logout-user', sessionController.logoutUser)

module.exports = loginRouter
