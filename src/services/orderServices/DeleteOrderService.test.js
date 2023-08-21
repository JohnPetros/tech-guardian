const OrderMock = require('../../mocks/OrderMock')
const DeleteOrderService = require('./DeleteOrderService')

describe('Delete order service', () => {
  let orderMock = null
  let deleteOrderService = null

  beforeEach(() => {
    orderMock = new OrderMock()
    deleteOrderService = new DeleteOrderService(orderMock)
  })

  it('should be able to deleta a order', async () => {
    const orderId = 'ec35917f-4991-44e1-8248-8b4e9baa4519'

    await deleteOrderService.execute(orderId)

    const deletedOrder = await orderMock.getById(orderId)

    expect(deletedOrder).toEqual(undefined)
  })

  it('should not be able to deleta a order that does not exist', async () => {
    const orderId = 'ec35917f-7777-44e1-8248-8b4e9baa4519'

    const error = await deleteOrderService.execute(orderId)

    expect(error).toEqual('Solicitação não encontrada')
  })

  it('should not be able to deleta a order with a invalid uuid', async () => {
    const orderId = 'invalid-uuid'

    const error = await deleteOrderService.execute(orderId)

    expect(error).toEqual('Solicitação não encontrada')
  })
})
