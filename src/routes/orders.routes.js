const { Router } = require('express')
const OrdersController = require('../controllers/OrdersController')

const ordersRouter = new Router()

const ordersController = new OrdersController()

ordersRouter.get('/open-orders', ordersController.renderOpenOrdersPage)

ordersRouter.get('/orders/:orderId', ordersController.renderOrderPage)

module.exports = ordersRouter
