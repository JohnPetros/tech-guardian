const Validator = require('../../utils/Validator')
const uuid = require('uuid')

class EditOrderService {
  constructor(orderModel) {
    this.orderModel = orderModel
  }

  async execute({ order_id, title, patrimony_id, description }) {
    if ([order_id, patrimony_id].some((id) => !uuid.validate(id))) {
      return ['Solicitação não encontrada']
    }

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
