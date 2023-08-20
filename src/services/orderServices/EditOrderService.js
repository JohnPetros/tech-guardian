const Validator = require('../../utils/Validator')

class EditOrderService {
  constructor(orderModel) {
    this.orderModel = orderModel
  }

  async execute({ order_id, title, patrimony_id, description }) {
    const validator = new Validator()

    const errors = await validator.validateOrder({
      title,
      patrimony_id,
      description,
    })

    if (errors) return errors

    const order = await this.orderModel.getById(order_id)

    if (!order) {
      return ['Solicitação não encontrada']
    }

    await this.orderModel.edit({
      id: order.id,
      title,
      patrimony_id,
      description,
    })
  }
}

module.exports = EditOrderService
