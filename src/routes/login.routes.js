const { Router } = require('express')
const LoginController = require('../controllers/loginController')

const loginController = new LoginController()

const loginRouter = Router()

loginRouter.get('/', loginController.getLoginPage)

module.exports = loginRouter
