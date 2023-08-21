const uuid = require('uuid')

class ResolveOrderService {
  constructor(orderModel, userModel) {
    this.orderModel = orderModel
    this.userModel = userModel
  }

  async execute(orderId, userId, solution) {
    if (!uuid.validate(orderId)) {
      return 'Solicitação não encontrada'
    }

    if (!uuid.validate(userId)) {
      return 'Usuário não encontrado'
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

    const user = await this.userModel.getById(userId)

    if (!user) {
      return 'Usuário não encontrado'
    }

    await this.orderModel.resolve(orderId, userId, solution)
  }
}

module.exports = ResolveOrderService
