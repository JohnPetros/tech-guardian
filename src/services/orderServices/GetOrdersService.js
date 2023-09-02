const formatTime = require('../../helpers/formatTime')

class GetOrdersService {
  constructor(orderModel) {
    this.orderModel = orderModel
  }

  async execute({ isOpen = true, search, patrimonies_ids, date, page }) {
    const { orders, count } = await this.orderModel.getAll({
      isOpen,
      search,
      patrimonies_ids,
      date,
      page: page && page < 1 ? 1 : page,
    })

    return {
      orders: orders.map((order) => ({
        ...order,
        created_at: formatTime(order.created_at),
      })),
      count: Number(count),
    }
  }
}

module.exports = GetOrdersService
