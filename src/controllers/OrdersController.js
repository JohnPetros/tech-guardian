const Order = require('../models/Order')
const GetOrders = require('../services/order/GetOrders')

class OrdersController {
  async renderOpenOrdersPage(request, response) {
    const { user } = request.session

    if (!user) {
      return response.redirect('/')
    }

    const order = new Order()

    const getOrders = new GetOrders(order)

    const openOrders = await getOrders.execute()

    response.render('pages/open-orders.ejs', { user, openOrders })
  }
}

module.exports = OrdersController
