const PatrimonyMock = require('../../mocks/PatrimonyMock')
const CreatePatrimonyService = require('./CreatePatrimonyService')
const GetPatrimonyByIdService = require('./GetPatrimonyByIdService')

let patrimonyMock = null
let createPatrimonyService = null
let getPatrimonyByIdService = null

describe('Get Patrimony By Id Service', () => {
  beforeEach(() => {
    patrimonyMock = new PatrimonyMock()
    createPatrimonyService = new CreatePatrimonyService(patrimonyMock)
    getPatrimonyByIdService = new GetPatrimonyByIdService(patrimonyMock)
  })

  it('should be able to get a patrimony by id', async () => {
    const newPatrimonyNumber = 777888

    await createPatrimonyService.execute(newPatrimonyNumber)

    const createdPatrimony = await patrimonyMock.getByNumber(newPatrimonyNumber)

    const patrimony = await getPatrimonyByIdService.execute(createdPatrimony.id)

    expect(patrimony.id).toBe(createdPatrimony.id)
    expect(patrimony.number).toBe(createdPatrimony.number)
  })

  it('should not be able to get a patrimony with a invalid uuid', async () => {
    const patrimonyId = 'invalid uuid'

    const error = await getPatrimonyByIdService.execute(patrimonyId)

    expect(error).toEqual('Patrimônio não encontrado')
  })

  it('should not be able to get a patrimony that does not exist', async () => {
    const patrimonyId = '3cfafb91-1c52-463a-83d7-4d87025c1d5d'

    const error = await getPatrimonyByIdService.execute(patrimonyId)

    expect(error).toEqual('Patrimônio não encontrado')
  })
})
