const OrderMock = require('../../mocks/OrderMock')
const GetOrdersService = require('./GetOrdersService')

describe('Get orders service', () => {
  let orderMock = null
  let getOrdersService = null

  beforeEach(() => {
    orderMock = new OrderMock()
    getOrdersService = new GetOrdersService(orderMock)
  })

  it('should be able to get all open orders', async () => {
    const { orders } = await getOrdersService.execute({ isOpen: true })

    orders.forEach((order) => {
      expect(order.is_open).toBe(true)
    })
  })

  it('should be able to get order by search', async () => {
    const { orders } = await getOrdersService.execute({
      isOpen: true,
      search: 'Máquina de lavar',
    })

    expect(
      orders.some((order) => order.title === 'Máquina de lavar pifou')
    ).toBe(true)
  })

  it('should be able to get order by patrimonies_ids', async () => {
    const { orders } = await getOrdersService.execute({
      isOpen: false,
      patrimonies_ids: ['b2737076-dcfe-4d8f-b4b3-76dcafdd99ef'],
    })

    orders.forEach((order) => {
      expect(order.is_open).toBe(false)
      expect(order.patrimony_id).toBe('b2737076-dcfe-4d8f-b4b3-76dcafdd99ef')
    })
  })

  it('should be able to get order by date', async () => {
    const { orders } = await getOrdersService.execute({
      date: '2023-08-20',
    })

    orders.forEach((order) => {
      expect(order.created_at.includes('20/08/23')).toBe(true)
    })
  })
})
