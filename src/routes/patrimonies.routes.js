const { Router } = require('express')

const checkRole = require('../middlewares/checkRole')

const PatrimoniesController = require('../controllers/PatrimoniesController')

const patrimoniesController = new PatrimoniesController()

const patrimoniesRouter = Router()

patrimoniesRouter.get(
  '/patrimonies',
  checkRole('admin'),
  patrimoniesController.renderPatrimoniesPage
)

patrimoniesRouter.get(
  '/new-patrimony',
  checkRole('admin'),
  patrimoniesController.renderNewPatrimonyPage
)

patrimoniesRouter.post(
  '/patrimony/create',
  checkRole('admin'),
  patrimoniesController.createPatrimony
)

module.exports = patrimoniesRouter
