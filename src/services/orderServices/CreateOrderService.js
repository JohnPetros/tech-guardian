const Validator = require('../../utils/Validator')

class CreateOrderService {
  constructor(orderModel, userModel) {
    this.orderModel = orderModel
    this.orderModel = userModel
  }

  async execute({ title, description, patrimony_id, user_id }) {
    const validator = new Validator()

    const errors = await validator.validateOrder({
      title,
      description,
      patrimony_id,
    })

    if (errors) return errors

    const user = await userModel.getById()

    if (!user) {
      return ['Toda solicitação deve estar associada a um usuário']
    }

    await this.orderModel.create({
      title,
      description,
      patrimony_id,
      user_id,
    })
  }
}

module.exports = CreateOrderService
