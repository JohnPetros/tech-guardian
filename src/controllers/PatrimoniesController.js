const PatrimonyModel = require('../models/PatrimonyModel')
const FlashMessage = require('../utils/FlashMessage')
const CreatePatrimonyService = require('../services/patrimonyServices/CreatePatrimonyService')
const GetPatrimonyById = require('../services/patrimonyServices/GetPatrimonyById')
const EditPatrimonyService = require('../services/patrimonyServices/EditPatrimonyService')
const DeletePatrimonyService = require('../services/patrimonyServices/DeletePatrimonyService')

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

  async renderPatrimonyPage(request, response) {
    const { user } = request.session
    const { patrimony_id } = request.params

    const patrimonyModel = new PatrimonyModel()

    const getPatrimonyById = new GetPatrimonyById(patrimonyModel)

    const patrimony = await getPatrimonyById.execute(patrimony_id)

    if (patrimony === 'Patrimônio não encontrado') {
      const flashMessage = new FlashMessage(response.flash)

      flashMessage.add('error', 'Patrimônio não encontrado')

      return response.redirect('/patrimonies')
    }

    response.render('pages/patrimony.ejs', { user, patrimony })
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

  async editPatrimony(request, response) {
    const { patrimony_id } = request.params
    const { number } = request.body

    const patrimonyModel = new PatrimonyModel()

    const editPatrimonyService = new EditPatrimonyService(patrimonyModel)

    const errors = await editPatrimonyService.execute(patrimony_id, number)

    const flashMessage = new FlashMessage(response.flash)

    if (errors) {
      for (const error of errors) flashMessage.add('error', error)

      flashMessage.addMultipleByRoute('/new-patrimony', {
        number,
      })

      return response.redirect('/patrimony/' + patrimony_id)
    }

    flashMessage.add('success', 'Patrimônio editado com sucesso')

    return response.redirect('/patrimony/' + patrimony_id)
  }

  async deletePatrimony(request, response) {
    const { patrimony_id } = request.params

    const patrimonyModel = new PatrimonyModel()

    const deletePatrimonyService = new DeletePatrimonyService(patrimonyModel)

    const error = await deletePatrimonyService.execute(patrimony_id)

    const flashMessage = new FlashMessage(response.flash)

    if (error) {
      flashMessage.add('error', error)

      response.redirect('/patrimony/' + patrimony_id)
    }

    flashMessage.add('success', 'Patrimônio deletado com sucesso')

    return response.redirect('/patrimonies')
  }
}

module.exports = PatrimoniesController
