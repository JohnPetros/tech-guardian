const { Router } = require('express')

const SessionController = require('../controllers/SessionController')

const sessionController = new SessionController()

const sessionRouter = Router()

sessionRouter.get('/', sessionController.renderLoginPage)

sessionRouter.post('/login-user', sessionController.loginUser)

sessionRouter.get('/register', sessionController.renderRegisterPage)

sessionRouter.post('/register-user', sessionController.registerUser)

sessionRouter.get('/logout-user', sessionController.logoutUser)

module.exports = sessionRouter
