const Order = require('../models/Order')
const Patrimony = require('../models/Patrimony')
const GetOrderById = require('../services/order/GetOrderById')
const GetOrders = require('../services/order/GetOrders')

class OrdersController {
  async renderOpenOrdersPage(request, response) {
    const { user } = request.session

    const order = new Order()

    const getOrders = new GetOrders(order)

    const openOrders = await getOrders.execute()

    response.render('pages/open-orders.ejs', { user, openOrders })
  }

  async renderNewOrderPage(request, response) {
    const { user } = request.session
    
    const patrimony = new Patrimony()

    const patrimonies = await patrimony.getPatrimonies()

    response.render('pages/new-order.ejs', { user, patrimonies })
  }

  async renderOrderPage(request, response) {
    const { user } = request.session

    const getOrderById = new GetOrderById(new Order())

    const order = await getOrderById.execute(request.params.orderId)

    console.log(order)

    response.render('pages/order.ejs', { user, order })
  }

  async createOrder() {
    const { name, email, password, passwordConfirmation, roleId } = request.body

  }
}

module.exports = OrdersController
