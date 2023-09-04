const { Router } = require('express')

const PatrimoniesController = require('../controllers/PatrimoniesController')

const patrimoniesController = new PatrimoniesController()

const patrimoniesRouter = Router()

patrimoniesRouter.get(
  '/patrimonies',
  patrimoniesController.renderPatrimoniesPage
)

module.exports = patrimoniesRouter
