const { Router } = require('express')
const OrdersController = require('../controllers/OrdersController')

const ordersRouter = new Router()

const ordersController = new OrdersController()

ordersRouter.get('/open-orders', ordersController.renderOpenOrdersPage)

module.exports = ordersRouter
