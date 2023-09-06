const PatrimonyMock = require('../../mocks/PatrimonyMock')
const CreatePatrimonyService = require('./CreatePatrimonyService')
const DeletePatrimonyService = require('./DeletePatrimonyService')

let patrimonyMock = null
let createPatrimonyService = null
let deletePatrimonyService = null

describe('Delete Patrimony Service', () => {
  beforeEach(() => {
    patrimonyMock = new PatrimonyMock()
    createPatrimonyService = new CreatePatrimonyService(patrimonyMock)
    deletePatrimonyService = new DeletePatrimonyService(patrimonyMock)
  })

  it('should be able to delete a patrimony', async () => {
    const patrimonyNumber = 777888

    await createPatrimonyService.execute(patrimonyNumber)

    const createdPatrimony = await patrimonyMock.getByNumber(patrimonyNumber)

    await deletePatrimonyService.execute(createdPatrimony.id)

    const deletedPatrimony = await patrimonyMock.getByNumber(
      createdPatrimony.number
    )

    expect(deletedPatrimony).toBe(undefined)
  })

  it('should not be able to create a patrimony with a invalid uuid', async () => {
    const patrimonyId = 'invalid uuid'

    const error = await deletePatrimonyService.execute(patrimonyId)

    expect(error).toBe('Patrimônio não encontrado')
  })

  it('should not be able to create a patrimony that does not exist', async () => {
    const patrimonyId = '3cfafb91-1c52-463a-83d7-4d87025c1d5d'

    const error = await deletePatrimonyService.execute(patrimonyId)

    expect(error).toBe('Patrimônio não encontrado')
  })
})
