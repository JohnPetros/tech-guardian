const { Router } = require('express')

const OrdersController = require('../controllers/OrdersController')

const checkRole = require('../middlewares/checkRole')
const checkUserId = require('../middlewares/checkUserId')

const ordersRouter = new Router()

const ordersController = new OrdersController()

ordersRouter.get('/open-orders', ordersController.renderOpenOrdersPage)

ordersRouter.get('/closed-orders', ordersController.renderClosedOrdersPage)

ordersRouter.get(
  '/new-order',
  checkRole('tech', 'Você precisa ser um tech para abrir uma solicitação'),
  ordersController.renderNewOrderPage
)

ordersRouter.get('/order/:orderId', ordersController.renderOrderPage)

ordersRouter.post(
  '/order/create',
  checkRole('tech', 'Você precisa ser um Tech para abrir uma solicitação'),
  ordersController.createOrder
)

ordersRouter.post(
  '/order/:order_id/edit',
  checkRole('tech', 'Você precisa ser um Tech para editar uma solicitação'),
  checkUserId('Somente o criador da solicitação pode editá-lo'),
  ordersController.editOrder
)

ordersRouter.post(
  '/order/:order_id/delete',
  checkRole('tech', 'Você precisa ser um Tech para deletar uma solicitação'),
  checkUserId('Somente o criador da solicitação pode deletá-lo'),
  ordersController.deleteOrder
)

ordersRouter.post(
  '/order/:order_id/resolve',
  checkRole('guardian', 'Você precisa ser um Guardian para enviar uma solução'),
  ordersController.resolveOrder
)

ordersRouter.post(
  '/order/:order_id/reopen',
  checkRole('tech', 'Você precisa ser um Tech para reabrir uma solicitação'),
  checkUserId('Somente o criador da solicitação pode reabrí-lo'),
  ordersController.reopenOrder
)

module.exports = ordersRouter
