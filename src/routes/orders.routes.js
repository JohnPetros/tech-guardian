const { Router } = require('express')

const OrdersController = require('../controllers/OrdersController')

const checkRole = require('../middlewares/checkRole')
const checkUserId = require('../middlewares/checkUserId')

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
  '/order/:order_id/edit',
  checkRole('tech', 'Você precisa ser um tech para editar uma solicitação'),
  checkUserId('Somente o criador da solicitação pode editá-lo'),
  ordersController.editOrder
)

ordersRouter.post(
  '/order/:order_id/delete',
  checkRole('tech', 'Você precisa ser um tech para deletar uma solicitação'),
  checkUserId('Somente o criador da solicitação pode deletá-lo'),
  ordersController.editOrder
)

module.exports = ordersRouter
