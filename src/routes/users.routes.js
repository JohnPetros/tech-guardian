const { Router } = require('express')

const multer = require('multer')
const uploadConfig = require('../configs/uploadConfig')
const checkRole = require('../middlewares/checkRole')
const checkSessionUserId = require('../middlewares/checkSessionUserId')

const UsersController = require('../controllers/UsersController')

const usersController = new UsersController()

const usersRouter = Router()

const upload = multer(uploadConfig.MULTER)

usersRouter.get('/user/:user_id', usersController.renderUserPage)

usersRouter.get('/users', checkRole('admin'), usersController.renderUsersPage)

usersRouter.get(
  '/new-user',
  checkRole('admin'),
  usersController.renderNewUserPage
)

usersRouter.post(
  '/user/create',
  checkRole('admin'),
  upload.single('avatar'),
  usersController.createUser
)

usersRouter.post(
  '/user/:user_id/edit',
  checkSessionUserId(),
  upload.single('avatar'),
  usersController.editUser
)

usersRouter.post(
  '/user/:user_id/delete',
  checkSessionUserId(),
  usersController.deleteUser
)

module.exports = usersRouter
