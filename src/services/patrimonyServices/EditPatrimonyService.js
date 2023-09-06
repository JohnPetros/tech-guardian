const Validator = require('../../utils/Validator')
const uuid = require('uuid')

class EditPatrimonyService {
  constructor(patrimonyModel) {
    this.patrimonyModel = patrimonyModel
  }

  async execute(id, number) {
    if (!uuid.validate(id)) {
      return ['Patrimônio não encontrado']
    }

    const validator = new Validator()

    const errors = await validator.validatePatrimonyNumber(number)

    if (errors) return errors

    const patrimony = await this.patrimonyModel.getById(id)

    if (!patrimony) return ['Patrimônio não encontrado']

    if (patrimony.number === number)
      return ['Número de patrimônio já existente']

    await this.patrimonyModel.edit(id, number)
  }
}

module.exports = EditPatrimonyService
