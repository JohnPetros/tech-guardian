const OrderModel = require('../models/OrderModel')
const UserModel = require('../models/UserModel')
const PatrimonyModel = require('../models/PatrimonyModel')

const GetOrderByIdService = require('../services/orderServices/GetOrderByIdService')
const GetOrdersService = require('../services/orderServices/GetOrdersService')
const CreateOrderService = require('../services/orderServices/CreateOrderService')
const EditOrderService = require('../services/orderServices/EditOrderService')

const FlashMessage = require('../utils/FlashMessage')
const DeleteOrderService = require('../services/orderServices/DeleteOrderService')
const ResolveOrderService = require('../services/orderServices/ResolveOrderService')
const ReopenOrderService = require('../services/orderServices/ReopenOrderService')

class OrdersController {
  async renderOpenOrdersPage(request, response) {
    const { user } = request.session
    const { search, patrimonies_ids, date, page } = request.query

    const orderModel = new OrderModel()

    const getOrdersService = new GetOrdersService(orderModel)

    const patrimonyModel = new PatrimonyModel()

    const { patrimonies } = await patrimonyModel.getAll({})

    const { orders, count } = await getOrdersService.execute({
      isOpen: true,
      search,
      patrimonies_ids,
      date,
      page,
    })

    response.render('pages/open-orders.ejs', {
      user,
      openOrders: orders,
      search,
      patrimonies,
      patrimonies_ids,
      date,
      page: page ? Number(page) : 1,
      openOrdersCount: count,
    })
  }

  async renderClosedOrdersPage(request, response) {
    const { user } = request.session
    const { search, patrimonies_ids, date, page } = request.query

    const orderModel = new OrderModel()

    const getOrdersService = new GetOrdersService(orderModel)

    const patrimonyModel = new PatrimonyModel()

    const patrimonies = await patrimonyModel.getAll()

    const { orders, count } = await getOrdersService.execute({
      isOpen: false,
      search,
    })

    response.render('pages/closed-orders.ejs', {
      user,
      closedOrders: orders,
      search,
      patrimonies,
      patrimonies_ids,
      date,
      page: page ? Number(page) : 1,
      closedOrdersCount: count,
    })
  }

  async renderNewOrderPage(request, response) {
    const { user } = request.session

    const patrimonyModel = new PatrimonyModel()

    const { patrimonies } = await patrimonyModel.getAll({})

    response.render('pages/new-order.ejs', { user, patrimonies })
  }

  async renderOrderPage(request, response) {
    const { user } = request.session

    const orderModel = new OrderModel()

    const getOrderById = new GetOrderByIdService(orderModel)

    const patrimonyModel = new PatrimonyModel()

    const { patrimonies } = await patrimonyModel.getAll({})

    const order = await getOrderById.execute(request.params.orderId)

    if (order === 'Solicitação não encontrada') {
      const flashMessage = new FlashMessage(response.flash)

      flashMessage.add('error', 'Solicitação não encontrada')

      return response.redirect('/open-orders')
    }

    response.render('pages/order.ejs', { user, order, patrimonies })
  }

  async createOrder(request, response) {
    const { title, description, patrimony_id, user_id } = request.body

    const orderModel = new OrderModel()
    const patrimonyModel = new PatrimonyModel()
    const userModel = new UserModel()

    const createOrderService = new CreateOrderService(
      orderModel,
      patrimonyModel,
      userModel
    )

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
    const { title, patrimony_id, description } = request.body

    const orderModel = new OrderModel()
    const patrimonyModel = new PatrimonyModel()

    const editOderService = new EditOrderService(orderModel, patrimonyModel)

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

  async resolveOrder(request, response) {
    const { order_id } = request.params
    const { user_id, solution } = request.body

    const orderModel = new OrderModel()
    const userModel = new UserModel()

    const deleteOrderService = new ResolveOrderService(orderModel, userModel)

    const error = await deleteOrderService.execute(order_id, user_id, solution)

    const flashMessage = new FlashMessage(response.flash)

    if (error) {
      flashMessage.add('error', error)

      response.redirect('/order/' + order_id)
    }

    flashMessage.add('success', 'Solução enviada com sucesso')

    return response.redirect('/open-orders')
  }

  async reopenOrder(request, response) {
    const { order_id } = request.params

    const orderModel = new OrderModel()

    const reopenOrderService = new ReopenOrderService(orderModel)

    const error = await reopenOrderService.execute(order_id)

    const flashMessage = new FlashMessage(response.flash)

    if (error) {
      flashMessage.add('error', error)

      response.redirect('/order/' + order_id)
    }

    flashMessage.add('success', 'Solução reaberta com sucesso')

    return response.redirect('/open-orders')
  }
}

module.exports = OrdersController
