const uuid = require('uuid')

class ResolveOrderService {
  constructor(orderModel) {
    this.orderModel = orderModel
  }

  async execute(orderId, solution) {
    if (!uuid.validate(orderId)) {
      return 'Solicitação não encontrada'
    }

    if (!solution) {
      return 'Por favor, escreva uma solução para o problema'
    }

    const order = await this.orderModel.getById(orderId)

    if (!order) {
      return 'Solicitação não encontrada'
    }

    if (!order.is_open) {
      return 'Solicitação já está fechada'
    }

    await this.orderModel.resolve(orderId, solution)
  }
}

module.exports = ResolveOrderService
