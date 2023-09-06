const PatrimonyMock = require('../../mocks/PatrimonyMock')
const CreatePatrimonyService = require('./CreatePatrimonyService')
const EditPatrimonyService = require('./EditPatrimonyService')

let patrimonyMock = null
let createPatrimonyService = null
let editPatrimonyService = null

describe('Edit Patrimony Service', () => {
  beforeEach(() => {
    patrimonyMock = new PatrimonyMock()
    createPatrimonyService = new CreatePatrimonyService(patrimonyMock)
    editPatrimonyService = new EditPatrimonyService(patrimonyMock)
  })

  it('should be able to edit a patrimony', async () => {
    const newPatrimonyNumber = 777888

    await createPatrimonyService.execute(newPatrimonyNumber)

    const createdPatrimony = await patrimonyMock.getByNumber(newPatrimonyNumber)

    const editedPatrimonyNumber = 111111

    await editPatrimonyService.execute(
      createdPatrimony.id,
      editedPatrimonyNumber
    )

    const editedPatrimony = await patrimonyMock.getByNumber(
      editedPatrimonyNumber
    )

    expect(editedPatrimony.number).toBe(editedPatrimonyNumber)
  })

  it('should not be able to edit a patrimony with a invalid uuid', async () => {
    const patrimonyId = 'invalid uuid'
    const patrimonyNumber = 777888

    const error = await editPatrimonyService.execute(patrimonyId, patrimonyNumber)

    expect(error).toEqual(['Patrimônio não encontrado'])
  })

  it('should not be able to edit a patrimony that does not exist', async () => {
    const patrimonyId = '3cfafb91-1c52-463a-83d7-4d87025c1d5d'
    const patrimonyNumber = 777888

    const error = await editPatrimonyService.execute(patrimonyId, patrimonyNumber)

    expect(error).toEqual(['Patrimônio não encontrado'])
  })
})
