const formatTime = require('../../helpers/formatTime')

class GetOrdersService {
  constructor(orderModel) {
    this.orderModel = orderModel
  }

  async execute({ isOpen = true, search, patrimonies_ids }) {
    const openOrders = await this.orderModel.getAll({ isOpen, search, patrimonies_ids })

    return openOrders.map((order) => ({
      ...order,
      created_at: formatTime(order.created_at),
    }))
  }
}

module.exports = GetOrdersService
