const { Router } = require('express')

const UsersController = require('../controllers/UsersController')

const usersController = new UsersController()

const usersRouter = Router()

usersRouter.get('/user/:user_id', usersController.renderUserPage)

module.exports = usersRouter
