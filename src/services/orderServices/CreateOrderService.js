const Validator = require('../../utils/Validator')

class CreateOrderService {
  constructor(orderModel) {
    this.orderModel = orderModel
  }

  async execute({ title, description, patrimony_id, user_id }) {
    const validator = new Validator()

    const errors = await validator.validateOrderCreation({
      title,
      description,
      patrimony_id,
      user_id,
    })

    if (errors) return errors

    this.order.create({
      title,
      description,
      patrimony_id,
      user_id,
    })
  }
}

module.exports = CreateOrderService