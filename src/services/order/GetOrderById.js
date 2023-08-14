const formatTime = require('../../helpers/formatTime')

class GetOrderById {
  constructor(order) {
    this.order = order
  }

  async execute(orderId) {
    const order = await this.order.getOrderById(orderId)

    return {
      ...order,
      created_at: formatTime(order.created_at),
    }
  }
}

module.exports = GetOrderById
