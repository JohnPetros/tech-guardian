const OrderMock = require('../../mocks/OrderMock')
const UserMock = require('../../mocks/UserMock')
const ResolveOrderService = require('./ResolveOrderService')

describe('Edit Order Service', () => {
  let orderMock = null
  let userMock = null
  let resolveOrderService = null

  beforeEach(() => {
    orderMock = new OrderMock()
    userMock = new UserMock()
    resolveOrderService = new ResolveOrderService(orderMock, userMock)
  })

  it('should be able to resolve a order', async () => {
    const orderId = 'ec35917f-4991-44e1-8248-8b4e9baa4519'
    const userId = '31be399e-431e-4237-b7b3-db6b6387c4c5'
    const solution = 'Order solution test'

    const errors = await resolveOrderService.execute(orderId, userId, solution)

    const resolvedOrder = await orderMock.getById(orderId)

    expect(errors).toEqual(undefined)
    expect(resolvedOrder).toHaveProperty('is_open', false)
    expect(resolvedOrder).toHaveProperty('solution', solution)
    expect(resolvedOrder).toHaveProperty('resolved_by', userId)
    expect(resolvedOrder).toHaveProperty('resolved_at')
    expect(resolvedOrder.resolved_at).toBeInstanceOf(Date)
  })

  it('should not be able to resolve a order with invalid orderId', async () => {
    const orderId = 'invalid order id'
    const userId = '31be399e-431e-4237-b7b3-db6b6387c4c5'
    const solution = 'Order solution test'

    const errors = await resolveOrderService.execute(orderId, userId, solution)

    expect(errors).toEqual('Solicitação não encontrada')
  })

  it('should not be able to resolve a order with invalid userId', async () => {
    const orderId = 'ec35917f-4991-44e1-8248-8b4e9baa4519'
    const userId = 'invalid order id'
    const solution = 'Order solution test'

    const errors = await resolveOrderService.execute(orderId, userId, solution)

    expect(errors).toEqual('Usuário não encontrado')
  })

  it('should not be able to resolve a order that does not exist', async () => {
    const orderId = 'ec35917f-7777-44e1-8248-8b4e9baa4519'
    const userId = '31be399e-431e-4237-b7b3-db6b6387c4c5'
    const solution = 'Order solution test'

    const errors = await resolveOrderService.execute(orderId, userId, solution)

    expect(errors).toEqual('Solicitação não encontrada')
  })

  it('should not be able to resolve a order whose user does not exist', async () => {
    const orderId = 'ec35917f-4991-44e1-8248-8b4e9baa4519'
    const userId = '31be399e-7777-4237-b7b3-db6b6387c4c5'
    const solution = 'Order solution test'

    const errors = await resolveOrderService.execute(orderId, userId, solution)

    expect(errors).toEqual('Usuário não encontrado')
  })
})
