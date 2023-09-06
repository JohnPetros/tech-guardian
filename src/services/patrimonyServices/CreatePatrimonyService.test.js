const PatrimonyMock = require('../../mocks/PatrimonyMock')
const CreatePatrimonyService = require('./CreatePatrimonyService')

let patrimonyMock = null
let createPatrimonyService = null

describe('Create Patrimony Service', () => {
  beforeEach(() => {
    patrimonyMock = new PatrimonyMock()
    createPatrimonyService = new CreatePatrimonyService(patrimonyMock)
  })

  it('should be able to create a new patrimony', async () => {
    const newPatrimonyNumber = 777888

    await createPatrimonyService.execute(newPatrimonyNumber)

    const createdPatrimony = await patrimonyMock.getByNumber(newPatrimonyNumber)

    expect(createdPatrimony.number).toBe(newPatrimonyNumber)
  })

  it('should not be able to create a patrimony that already exists', async () => {
    const patrimonyNumber = 777888

    await createPatrimonyService.execute(patrimonyNumber)

    const errors = await createPatrimonyService.execute(patrimonyNumber)

    expect(errors).toEqual(['Patrimônio já existente'])
  })
})
