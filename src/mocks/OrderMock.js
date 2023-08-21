class OrderMock {
  orders = [
    {
      id: 'ec35917f-4991-44e1-8248-8b4e9baa4519',
      title: 'Help!!!',
      created_at: new Date('2023-08-20T21:04:06.570Z'),
      patrimony_number: '98746',
      created_by: 'João Pedro',
      is_open: true,
    },
    {
      id: '08d38df3-d121-4d81-937c-a213e06b66df',
      title: 'Torradeira queimou',
      created_at: new Date('2023-08-13T20:24:07.490Z'),
      patrimony_number: '321789',
      created_by: 'kurisu',
      is_open: false,
    },
    {
      id: '08d38df3-d121-4d81-555d-a213e06b66df',
      title: 'Na minha máquina funciona',
      created_at: new Date('2023-08-13T20:24:07.490Z'),
      patrimony_number: '321789',
      created_by: 'Okabe',
      is_open: false,
    },
  ]

  async getAll(isOpen = true) {
    return this.orders
      .filter((order) => order.is_open === isOpen)
      .map((order) => ({
        id: order.id,
        title: order.title,
        patrimony_number: order.patrimony_number,
        created_at: order.created_at,
        created_by: order.created_by,
        is_open: order.is_open,
      }))
  }

  async getById(id) {
    return this.orders.find((order) => order.id === id)
  }

  async getByTitle(title) {
    return this.orders.find((order) => order.title === title)
  }

  async edit(newData) {
    const editedOrders = this.orders.map((order) =>
      order.id === newData.id ? { ...order, ...newData } : order
    )
    this.orders = editedOrders
  }

  async create({ id, title, description, patrimony_id, user_id }) {
    return this.orders.push({
      id,
      title,
      description,
      patrimony_id,
      created_by: user_id,
      is_open: true,
      created_at: new Date(),
    })
  }

  async delete(id) {
    this.orders = this.orders.filter((order) => order.id !== id)
  }

  async resolve(id, userId, solution) {
    this.orders = this.orders.map((order) =>
      order.id === id
        ? {
            ...order,
            is_open: false,
            solution: solution,
            resolved_by: userId,
            resolved_at: new Date(),
          }
        : order
    )
  }
}

module.exports = OrderMock
