const Validator = require('../../utils/Validator')

class CreatePatrimonyService {
  constructor(patrimonyModel) {
    this.patrimonyModel = patrimonyModel
  }

  async execute(number) {
    const validator = new Validator()

    const errors = await validator.validatePatrimony(number)

    if (errors) return errors

    const patrimony = await this.patrimonyModel.getByNumber(number)

    console.log(patrimony)

    if (patrimony) return ['Patrimônio já existente']

    await this.patrimonyModel.create(number)
  }
}

module.exports = CreatePatrimonyService
