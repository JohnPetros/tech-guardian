class OrdersController {
  renderOpenOrdersPage(request, response) {
    response.render('pages/open-orders.ejs', { user: request.session.user })
  }
}

module.exports = OrdersController
