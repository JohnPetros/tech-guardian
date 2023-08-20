class DeleteOrderService {
  constructor(orderModel) {
    this.orderModel = orderModel
  }

  async execute(orderId) {
    const order = await this.orderModel.getById(orderId)

    if (!order) {
      return 'Solicitação não encontrada'
    }

    await this.orderModel.delete(orderId)
  }
}

module.exports = DeleteOrderService
