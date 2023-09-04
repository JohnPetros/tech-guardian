const uuid = require('uuid')

class DeletePatrimonyService {
  constructor(patrimonyModel) {
    this.patrimonyModel = patrimonyModel
  }

  async execute(id) {
    if (!uuid.validate(id)) {
      return 'Patrimônio não encontrado'
    }

    const patrimony = await this.patrimonyModel.getById(id)

    if (!patrimony) return 'Patrimônio não encontrado'

    await this.patrimonyModel.delete(id)
  }
}

module.exports = DeletePatrimonyService
