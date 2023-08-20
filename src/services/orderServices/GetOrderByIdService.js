const formatTime = require('../../helpers/formatTime')

class GetOrderByIdService {
  constructor(orderModel) {
    this.orderModel = orderModel
  }

  async execute(orderId) {
    const order = await this.orderModel.getById(orderId)

    return {
      ...order,
      created_at: formatTime(order.created_at),
    }
  }
}

module.exports = GetOrderByIdService
