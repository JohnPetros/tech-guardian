const { Router } = require('express')

const multer = require('multer')
const uploadConfig = require('../configs/uploadConfig')
const checkRole = require('../middlewares/checkRole')

const UsersController = require('../controllers/UsersController')

const usersController = new UsersController()

const usersRouter = Router()

const upload = multer(uploadConfig.MULTER)

usersRouter.get('/user/:user_id', usersController.renderUserPage)

usersRouter.get('/users', checkRole('admin'), usersController.renderUsersPage)

usersRouter.post(
  '/user/:user_id/edit',
  upload.single('avatar'),
  usersController.editUser
)

module.exports = usersRouter
