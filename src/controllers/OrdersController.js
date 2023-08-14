const Order = require('../models/Order')
const GetOrderById = require('../services/order/GetOrderById')
const GetOrders = require('../services/order/GetOrders')

class OrdersController {
  async renderOpenOrdersPage(request, response) {
    const { user } = request.session
    if (!user) return response.redirect('/')

    const order = new Order()

    const getOrders = new GetOrders(order)

    const openOrders = await getOrders.execute()

    response.render('pages/open-orders.ejs', { user, openOrders })
  }

  async renderOrderPage(request, response) {
    const { user } = request.session

    if (!user) return response.redirect('/')

    const getOrderById = new GetOrderById(new Order())

    const order = await getOrderById.execute(request.params.orderId)

    console.log(order)

    response.render('pages/order.ejs', { user, order })
  }
}

module.exports = OrdersController
