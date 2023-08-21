const uuid = require('uuid')

class DeleteOrderService {
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

    await this.orderModel.delete(orderId)
  }
}

module.exports = DeleteOrderService
