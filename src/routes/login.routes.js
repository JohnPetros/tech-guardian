const { Router } = require('express')
const LoginController = require('../controllers/loginController')

const loginController = new LoginController()

const loginRouter = Router()

loginRouter.get('/', loginController.getLoginPage)

loginRouter.post('/login', loginController.handleLogin)

module.exports = loginRouter
