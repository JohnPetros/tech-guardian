class OrdersController {
  renderOpenOrdersPage(request, response) {
    const { user } = request.session

    if (!user) {
      return response.redirect('/')
    }
    
    response.render('pages/open-orders.ejs', { user })
  }
}

module.exports = OrdersController
