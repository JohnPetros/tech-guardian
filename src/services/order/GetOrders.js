class GetOrders {
  constructor(order) {
    this.order = order
  }

  formatTime(time) {
    return (
      time.toLocaleDateString('pt-BR', {
        year: '2-digit',
        month: '2-digit',
        day: '2-digit',
      }) +
      ' às ' +
      time.toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
      })
    )
  }

  async execute(isOpen = true) {
    const openOrders = await this.order.getOrders(isOpen)

    return openOrders.map((order) => ({
      ...order,
      created_at: this.formatTime(order.created_at),
    }))
  }
}

module.exports = GetOrders
