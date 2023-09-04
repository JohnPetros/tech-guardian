const PatrimonyModel = require('../models/PatrimonyModel')

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
}

module.exports = PatrimoniesController
