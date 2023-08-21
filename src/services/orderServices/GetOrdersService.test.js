const OrderMock = require('../../mocks/OrderMock')
const GetOrdersService = require('./GetOrdersService')

describe('Get orders service', () => {
  it('should get all open orders correctly', async () => {
    const orderMock = new OrderMock()
    const getOrdersService = new GetOrdersService(orderMock)

    const orders = await getOrdersService.execute()

    orders.forEach((order) => {
      expect(order).toHaveProperty('is_open')

      expect(order.is_open).toEqual(true)
    })
  })
})
