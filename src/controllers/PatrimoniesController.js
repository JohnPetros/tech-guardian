const PatrimonyModel = require('../models/PatrimonyModel')
const FlashMessage = require('../utils/FlashMessage')
const CreatePatrimonyService = require('../services/patrimonyServices/CreatePatrimonyService')

class PatrimoniesController {
  async renderPatrimoniesPage(request, response) {
    const { user } = request.session
    const { search, page } = request.query

    const patrimonyModel = new PatrimonyModel()

    const { patrimonies, count } = await patrimonyModel.getAll({ search, page })

    response.render('pages/patrimonies.ejs', {
      user,
      patrimonies,
      search,
      page,
      patrimoniesCount: count,
    })
  }

  async renderNewPatrimonyPage(request, response) {
    const { user } = request.session

    response.render('pages/new-patrimony.ejs', { user })
  }

  async createPatrimony(request, response) {
    const { number } = request.body

    const patrimonyModel = new PatrimonyModel()

    const createPatrimonyService = new CreatePatrimonyService(patrimonyModel)

    const errors = await createPatrimonyService.execute(number)

    const flashMessage = new FlashMessage(response.flash)

    if (errors) {
      for (const error of errors) flashMessage.add('error', error)

      flashMessage.addMultipleByRoute('/new-patrimony', {
        number,
      })

      return response.redirect('/new-patrimony')
    }

    flashMessage.add('success', 'Patrimônio cadastrado com sucesso')

    return response.redirect('/patrimonies')
  }
}

module.exports = PatrimoniesController
