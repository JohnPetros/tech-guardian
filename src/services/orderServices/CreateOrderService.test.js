const OrderMock = require('../../mocks/OrderMock')
const UserMock = require('../../mocks/UserMock')
const PatrimonyMock = require('../../mocks/PatrimonyMock')
const CreateOrderService = require('./CreateOrderService')

describe('Create order service', () => {
  let orderMock = null
  let userMock = null
  let patrimonyMock = null
  let createOrderService = null

  beforeEach(() => {
    orderMock = new OrderMock()
    patrimonyMock = new PatrimonyMock()
    userMock = new UserMock()
    createOrderService = new CreateOrderService(
      orderMock,
      patrimonyMock,
      userMock
    )
  })

  it('should be able to create a new order', async () => {
    const newOrder = {
      title: 'title mock',
      description: 'description mock',
      patrimony_id: 'b2737076-dcfe-4d8f-b4b3-76dcafdd99ef',
      user_id: '31be399e-431e-4237-b7b3-db6b6387c4c5',
    }

    const errors = await createOrderService.execute(newOrder)

    const createdOrder = await orderMock.getByTitle(newOrder.title)

    expect(errors).toEqual(undefined)
    expect(createdOrder).toHaveProperty("title", newOrder.title);
    expect(createdOrder).toHaveProperty("description", newOrder.description);
    expect(createdOrder).toHaveProperty("patrimony_id", newOrder.patrimony_id);
    expect(createdOrder).toHaveProperty("created_by", newOrder.user_id);
  })

  it('should not be able to create a new order when patrimony_id is a invalid uuid', async () => {
    const newOrder = {
      title: 'title mock',
      description: 'description mock',
      patrimony_id: '31be399e-431e-4237-b7b3-',
      user_id: '31be399e-431e-4237-b7b3-db6b6387c4c5',
    }

    const errors = await createOrderService.execute(newOrder)

    expect(errors).toEqual(["Solicitação não encontrada"])
  })

  it('should not be able to create a new order when user_id is a invalid uuid', async () => {
    const newOrder = {
      title: 'title mock',
      description: 'description mock',
      patrimony_id: '31be399e-431e-4237-b7b3-db6b6387c4c5',
      user_id: '31be399e-431e-4237-b7b3-',
    }

    const errors = await createOrderService.execute(newOrder)

    expect(errors).toEqual(["Solicitação não encontrada"])
  })

  it('should not be able to create a new order with a patrimony that does not exists', async () => {
    const newOrder = {
      title: 'title mock',
      description: 'description mock',
      patrimony_id: '31be399e-431e-4237-b7b3-db6b6387c4c5',
      user_id: '31be399e-431e-4237-b7b3-db6b6387c4c5',
    }

    const errors = await createOrderService.execute(newOrder)

    expect(errors).toEqual(["Toda solicitação deve estar associada a um patrimônio"])
  })

  it('should not be able to create a new order with a user that does not exists', async () => {
    const newOrder = {
      title: 'title mock',
      description: 'description mock',
      patrimony_id: 'b2737076-dcfe-4d8f-b4b3-76dcafdd99ef',
      user_id: 'b2737076-dcfe-4d8f-b4b3-76dcafdd99ef',
    }

    const errors = await createOrderService.execute(newOrder)

    expect(errors).toEqual(['Toda solicitação deve estar associada a um usuário'])
  })
})
