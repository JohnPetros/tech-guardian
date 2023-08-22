const uuid = require('uuid')

class ReopenOrderService {
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

    if (order.is_open) {
      return 'Solicitação já está aberta'
    }

    await this.orderModel.reopen(orderId)
  }
}

module.exports = ReopenOrderService
