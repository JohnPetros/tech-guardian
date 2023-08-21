const OrderMock = require('../../mocks/OrderMock')
const GetOrderByIdService = require('./GetOrderByIdService')

describe('Get order by id service', () => {
  let orderMock = null
  let getOrderByIdService = null

  beforeEach(() => {
    orderMock = new OrderMock()
    getOrderByIdService = new GetOrderByIdService(orderMock)
  })

  it('should be able to get a order', async () => {
    const orderId = '08d38df3-d121-4d81-937c-a213e06b66df'

    const order = await getOrderByIdService.execute(orderId)

    expect(order.id).toBe(orderId)
  })

  it('should not be able to get a order when uuid is invalid', async () => {
    const orderId = '08d38df3-d121-4d81-937c'

    const order = await getOrderByIdService.execute(orderId)

    expect(order).toBe('Solicitação não encontrada')
  })

  it('should not be able to get a order that does not exists', async () => {
    const orderId = '08d38df3-7777-4d81-937c-a213e06b66df'

    const order = await getOrderByIdService.execute(orderId)

    expect(order).toBe('Solicitação não encontrada')
  })
})
