const formatTime = require('../../helpers/formatTime')
const uuid = require('uuid')

class GetOrderByIdService {
  constructor(orderModel) {
    this.orderModel = orderModel
  }

  async execute(orderId) {
    if (!uuid.validate(orderId)) {
      return 'Solicitação não encontrada'
    }

    const order = await this.orderModel.getById(orderId)

    if (!order) {
      return 'Solicitação não encontrada'
    }

    return {
      ...order,
      created_at: formatTime(order.created_at),
      resolved_at: order.resolved_at ? formatTime(order.resolved_at) : null,
    }
  }
}

module.exports = GetOrderByIdService
