const { Router } = require('express')
const multer = require('multer')
const uploadConfig = require('../configs/uploadConfig')

const UsersController = require('../controllers/UsersController')

const usersController = new UsersController()

const usersRouter = Router()

const upload = multer(uploadConfig.MULTER)

usersRouter.get('/user/:user_id', usersController.renderUserPage)

usersRouter.post(
  '/user/:user_id/edit',
  upload.single('avatar'),
  usersController.editUser
)

module.exports = usersRouter
