const { Router } = require('express')
const OrdersController = require('../controllers/OrdersController')
const checkRole = require('../middlewares/checkRole')

const ordersRouter = new Router()

const ordersController = new OrdersController()

ordersRouter.get('/open-orders', ordersController.renderOpenOrdersPage)

ordersRouter.get(
  '/new-order',
  checkRole('tech', 'Você precisa ser um tech para abrir uma solicitação'),
  ordersController.renderNewOrderPage
)

ordersRouter.get('/order/:orderId', ordersController.renderOrderPage)

ordersRouter.post(
  '/order/create',
  checkRole('tech', 'Você precisa ser um tech para abrir uma solicitação'),
  ordersController.createOrder
)

ordersRouter.post(
  '/order/:user_id/edit',
  checkRole('tech', 'Você precisa ser um tech para editar uma solicitação'),
  ordersController.editOrder
)



module.exports = ordersRouter
