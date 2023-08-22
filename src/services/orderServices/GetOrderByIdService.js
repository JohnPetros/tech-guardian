const formatTime = require('../../helpers/formatTime')
const uuid = require('uuid')

class GetOrderByIdService {
  constructor(orderModel) {
    this.orderModel = orderModel
  }

  async execute(orderId) {
    console.log(orderId)

    const _order = await this.orderModel.getById(orderId)

    console.log({ _order })

    if (!uuid.validate(orderId)) {
      return 'Solicitação não encontrada'
    }
    const order = await this.orderModel.getById(orderId)

    console.log(order)

    if (!order) {
      return 'Solicitação não encontrada'
    }

    return {
      ...order,
      created_at: formatTime(order.created_at),
    }
  }
}

module.exports = GetOrderByIdService
