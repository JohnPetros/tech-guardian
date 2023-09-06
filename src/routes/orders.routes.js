const { Router } = require('express')

const OrdersController = require('../controllers/OrdersController')

const checkRole = require('../middlewares/checkRole')
const checkSessionUserId = require('../middlewares/checkSessionUserId')

const ordersRouter = new Router()

const ordersController = new OrdersController()

ordersRouter.get('/open-orders', ordersController.renderOpenOrdersPage)

ordersRouter.get('/closed-orders', ordersController.renderClosedOrdersPage)

ordersRouter.get(
  '/new-order',
  checkRole('tech', 'Você precisa ser um tech para abrir uma solicitação'),
  ordersController.renderNewOrderPage
)

ordersRouter.get('/order/:order_id', ordersController.renderOrderPage)

ordersRouter.post(
  '/order/create',
  checkRole('tech', 'Você precisa ser um Tech para abrir uma solicitação'),
  ordersController.createOrder
)

ordersRouter.post(
  '/order/:order_id/:user_id/edit',
  checkRole('tech', 'Você precisa ser um Tech para editar uma solicitação'),
  checkSessionUserId('Somente o criador da solicitação pode editá-la'),
  ordersController.editOrder
)

ordersRouter.post(
  '/order/:order_id/:user_id/delete',
  checkRole('tech', 'Você precisa ser um Tech para deletar uma solicitação'),
  checkSessionUserId('Somente o criador da solicitação pode deletá-la'),
  ordersController.deleteOrder
)

ordersRouter.post(
  '/order/:order_id/:user_id/resolve',
  checkRole('guardian', 'Você precisa ser um Guardian para enviar uma solução'),
  ordersController.resolveOrder
)

ordersRouter.post(
  '/order/:order_id/:user_id/reopen',
  checkRole('tech', 'Você precisa ser um Tech para reabrir uma solicitação'),
  checkSessionUserId('Somente o criador da solicitação pode reabrí-lo'),
  ordersController.reopenOrder
)

module.exports = ordersRouter
