const { Router } = require('express')
const OrdersController = require('../controllers/OrdersController')
const checkSession = require('../middlewares/checkSession')
const checkRole = require('../middlewares/checkRole')

const ordersRouter = new Router()

const ordersController = new OrdersController()

ordersRouter.use(checkSession)

ordersRouter.get('/open-orders', ordersController.renderOpenOrdersPage)

ordersRouter.get('/new-order', ordersController.renderNewOrderPage)

ordersRouter.get('/order/:orderId', ordersController.renderOrderPage)

ordersRouter.post(
  '/order/create',
  checkRole('tech'),
  ordersController.createOrder
)

module.exports = ordersRouter
