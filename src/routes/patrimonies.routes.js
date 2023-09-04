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

patrimoniesRouter.get(
  '/patrimony/:patrimony_id',
  checkRole('admin'),
  patrimoniesController.renderPatrimonyPage
)

patrimoniesRouter.post(
  '/patrimony/create',
  checkRole('admin'),
  patrimoniesController.createPatrimony
)

patrimoniesRouter.post(
  '/patrimony/:patrimony_id/edit',
  checkRole('admin'),
  patrimoniesController.editPatrimony
)

patrimoniesRouter.post(
  '/patrimony/:patrimony_id/delete',
  checkRole('admin'),
  patrimoniesController.deletePatrimony
)

module.exports = patrimoniesRouter
