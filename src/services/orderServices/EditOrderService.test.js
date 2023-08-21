const OrderMock = require('../../mocks/OrderMock')
const PatrimonyMock = require('../../mocks/PatrimonyMock')
const EditOrderService = require('./EditOrderService')

describe('Edit Order Service', () => {
  let orderMock = null
  let patrimonyMock = null
  let editOrderService = null

  beforeEach(() => {
    orderMock = new OrderMock()
    patrimonyMock = new PatrimonyMock()
    editOrderService = new EditOrderService(orderMock, patrimonyMock)
  })

  it('should be able to edit a order', async () => {
    const newData = {
      order_id: 'ec35917f-4991-44e1-8248-8b4e9baa4519',
      patrimony_id: '4ba2af62-552b-4225-b5d8-157f3369e654',
      title: 'New order test',
      description: 'New description order test',
    }

    const errors = await editOrderService.execute(newData)

    const editedOrder = await orderMock.getById(newData.order_id)

    expect(errors).toEqual(undefined)
    expect(editedOrder).toHaveProperty('title', newData.title)
    expect(editedOrder).toHaveProperty('description', newData.description)
    expect(editedOrder).toHaveProperty('patrimony_id', newData.patrimony_id)
  })

  it('should not be able to edit a order with not valid uuids', async () => {
    const newData = {
      order_id: 'ec35917f-4991-44e1-8248-',
      patrimony_id: '4ba2af62-552b-4225-b5d8-',
      title: 'New order test',
      description: 'New description order test',
    }

    const errors = await editOrderService.execute(newData)

    expect(errors).toEqual(['Solicitação não encontrada'])
  })

  it('should not be able to edit a order that does not exist', async () => {
    const newData = {
      order_id: 'ec35917f-7777-44e1-8248-8b4e9baa4519',
      patrimony_id: '4ba2af62-552b-4225-b5d8-157f3369e654',
      title: 'New order test',
      description: 'New description order test',
    }

    const errors = await editOrderService.execute(newData)

    expect(errors).toEqual(['Solicitação não encontrada'])
  })

  it('should not be able to edit a order with a patrimony that does not exist', async () => {
    const newData = {
      order_id: 'ec35917f-4991-44e1-8248-8b4e9baa4519',
      patrimony_id: '4ba2af62-7777-4225-b5d8-157f3369e654',
      title: 'New order test',
      description: 'New description order test',
    }

    const errors = await editOrderService.execute(newData)

    expect(errors).toEqual(['Patrimônio não encontrado'])
  })
})
