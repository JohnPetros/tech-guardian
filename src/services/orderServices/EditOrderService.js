const Validator = require('../../utils/Validator')
const uuid = require('uuid')

class EditOrderService {
  constructor(orderModel, patrimonyModel) {
    this.orderModel = orderModel
    this.patrimonyModel = patrimonyModel
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

    const patrimony = await this.patrimonyModel.getById(patrimony_id)

    if (!patrimony) {
      return ['Patrimônio não encontrado']
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
