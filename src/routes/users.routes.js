const { Router } = require('express')

const UsersController = require('../controllers/UsersController')

const usersController = new UsersController()

const usersRouter = Router()

usersRouter.get('/user/:user_id', usersController.renderUserPage)

usersRouter.post('/user/:user_id/edit', usersController.editUser)

module.exports = usersRouter
