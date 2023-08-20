const OrderModel = require('../models/OrderModel')
const UserModel = require('../models/UserModel')
const PatrimonyModel = require('../models/PatrimonyModel')

const GetOrderByIdService = require('../services/orderServices/GetOrderByIdService')
const GetOrdersService = require('../services/orderServices/GetOrdersService')
const CreateOrderService = require('../services/orderServices/CreateOrderService')
const GetOrderFormActionService = require('../services/orderServices/GetOrderFormActionService')
const EditOrderService = require('../services/orderServices/EditOrderService')

const FlashMessage = require('../utils/FlashMessage')
const DeleteOrderService = require('../services/orderServices/DeleteOrderService')

class OrdersController {
  async renderOpenOrdersPage(request, response) {
    const { user } = request.session

    const orderModel = new OrderModel()

    const getOrdersService = new GetOrdersService(orderModel)

    const openOrders = await getOrdersService.execute()

    response.render('pages/open-orders.ejs', { user, openOrders })
  }

  async renderNewOrderPage(request, response) {
    const { user } = request.session

    const patrimonyModel = new PatrimonyModel()

    const patrimonies = await patrimonyModel.getAll()

    response.render('pages/new-order.ejs', { user, patrimonies })
  }

  async renderOrderPage(request, response) {
    const { user } = request.session

    const orderModel = new OrderModel()
    const getOrderById = new GetOrderByIdService(orderModel)

    const getOrderFormActionService = new GetOrderFormActionService(user)

    const action = getOrderFormActionService.execute()

    const patrimonyModel = new PatrimonyModel()

    const patrimonies = await patrimonyModel.getAll()

    const order = await getOrderById.execute(request.params.orderId)

    response.render('pages/order.ejs', { user, order, action, patrimonies })
  }

  async createOrder(request, response) {
    const { title, description, patrimony_id, user_id } = request.body

    const orderModel = new OrderModel()
    const userModel = new UserModel()

    const createOrderService = new CreateOrderService(orderModel, userModel)

    const errors = await createOrderService.execute({
      title,
      description,
      patrimony_id,
      user_id,
    })

    const flashMessage = new FlashMessage(response.flash)

    if (errors) {
      for (const error of errors) {
        flashMessage.add('error', error)
      }

      flashMessage.addMultipleByRoute('/register', {
        title,
        description,
        patrimony_id,
      })

      return response.redirect('/new-order')
    }

    flashMessage.add('success', 'Solicitação aberta com sucesso')

    return response.redirect('/open-orders')
  }

  async editOrder(request, response) {
    const { order_id } = request.params
    const { title, patrimony_id, description, user_id } = request.body

    const orderModel = new OrderModel()

    const editOderService = new EditOrderService(orderModel)

    const errors = await editOderService.execute({
      order_id,
      title,
      patrimony_id,
      description,
    })

    const flashMessage = new FlashMessage(response.flash)

    if (errors) {
      for (const error of errors) {
        flashMessage.add('error', error)
      }

      flashMessage.addMultipleByRoute('/order', {
        title,
        description,
        patrimony_id,
      })

      return response.redirect('/order/' + order_id)
    }

    flashMessage.add('success', 'Solicitação editada com sucesso')

    return response.redirect('/order/' + order_id)
  }

  async deleteOrder(request, response) {
    const { order_id } = request.params

    const orderModel = new OrderModel()

    const deleteOrderService = new DeleteOrderService(orderModel)

    const error = await deleteOrderService.execute(order_id)

    const flashMessage = new FlashMessage(response.flash)

    if (error) {
      flashMessage.add('error', error)

      response.redirect('/order/' + order_id)
    }

    flashMessage.add('success', 'Solicitação deletada com sucesso')

    return response.redirect('/open-orders')
  }
}

module.exports = OrdersController
