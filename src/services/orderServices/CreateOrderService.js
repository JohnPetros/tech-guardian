const Validator = require('../../utils/Validator')
const uuid = require('uuid')

class CreateOrderService {
  constructor(orderModel, patrimonyModel, userModel) {
    this.orderModel = orderModel
    this.patrimonyModel = patrimonyModel
    this.userModel = userModel
  }

  async execute({ title, description, patrimony_id, user_id }) {
    if ([patrimony_id, user_id].some((id) => !uuid.validate(id))) {
      return ['Solicitação não encontrada']
    }

    const validator = new Validator()

    const errors = await validator.validateOrder({
      title,
      description,
      patrimony_id,
    })

    if (errors) return errors

    const patrimony = await this.patrimonyModel.getById(patrimony_id)

    if (!patrimony) {
      return ['Toda solicitação deve estar associada a um patrimônio']
    }

    const user = await this.userModel.getById(user_id)

    if (!user) {
      return ['Toda solicitação deve estar associada a um usuário']
    }

    await this.orderModel.create({
      id: uuid.v4(),
      title,
      description,
      patrimony_id,
      user_id,
    })
  }
}

module.exports = CreateOrderService
