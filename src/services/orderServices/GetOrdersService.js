const formatTime = require('../../helpers/formatTime')

class GetOrdersService {
  constructor(orderModel) {
    this.orderModel = orderModel
  }

  async execute({ isOpen = true, search }) {
    const openOrders = await this.orderModel.getAll({ isOpen, search })

    return openOrders.map((order) => ({
      ...order,
      created_at: formatTime(order.created_at),
    }))
  }
}

module.exports = GetOrdersService
