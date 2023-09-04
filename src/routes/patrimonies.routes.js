const { Router } = require('express')

const checkRole = require('../middlewares/checkRole')

const PatrimoniesController = require('../controllers/PatrimoniesController')

const patrimoniesController = new PatrimoniesController()

const patrimoniesRouter = Router()

patrimoniesRouter.get(
  '/patrimonies',
  patrimoniesController.renderPatrimoniesPage
)

patrimoniesRouter.get(
  '/new-patrimony',
  // checkRole('admin'),
  patrimoniesController.renderNewPatrimonyPage
)

module.exports = patrimoniesRouter
