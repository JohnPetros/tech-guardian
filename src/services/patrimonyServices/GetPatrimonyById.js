const uuid = require('uuid')

class GetPatrimonyById {
  constructor(patrimonyModel) {
    this.patrimonyModel = patrimonyModel
  }

  async execute(id) {
    if (!uuid.validate(id)) {
      return 'Patrimônio não encontrado'
    }
    const patrimony = await this.patrimonyModel.getById(id)

    if (!patrimony) return 'Patrimônio não encontrado'

    return patrimony
  }
}

module.exports = GetPatrimonyById
