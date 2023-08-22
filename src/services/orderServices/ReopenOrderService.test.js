const OrderMock = require('../../mocks/OrderMock')
const ReopenOrderService = require('./ReopenOrderService')

describe('Reopen Order Service', () => {
  let orderMock = null
  let reopenOrderService = null

  beforeEach(() => {
    orderMock = new OrderMock()
    reopenOrderService = new ReopenOrderService(orderMock)
  })

  it('should be able to reopen a order', async () => {
    const orderId = '08d38df3-d121-4d81-937c-a213e06b66df'

    const errors = await reopenOrderService.execute(orderId)

    const resolvedOrder = await orderMock.getById(orderId)

    expect(errors).toEqual(undefined)
    expect(resolvedOrder).toHaveProperty('is_open', true)
  })

  it('should not be able to reopen a order with invalid uuid', async () => {
    const orderId = 'invalid uuid'

    const errors = await reopenOrderService.execute(orderId)

    expect(errors).toEqual('Solicitação não encontrada')
  })

  it('should not be able to reopen a order that does not exist', async () => {
    const orderId = '08d38df3-d121-4d81-9999-a213e06b66df'

    const errors = await reopenOrderService.execute(orderId)

    expect(errors).toEqual('Solicitação não encontrada')
  })

  it('should not be able to reopen a order that already is open', async () => {
    const orderId = 'ec35917f-4991-44e1-8248-8b4e9baa4519'

    const errors = await reopenOrderService.execute(orderId)

    expect(errors).toEqual('Solicitação já está aberta')
  })
})
