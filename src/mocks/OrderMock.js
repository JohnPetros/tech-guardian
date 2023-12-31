class OrderMock {
  orders = [
    {
      id: 'ec35917f-4991-44e1-8248-8b4e9baa4519',
      title: 'Help!!!',
      created_at: new Date('2023-08-20T21:04:06.570Z'),
      resolved_at: new Date('2023-15-24T21:04:06.570Z'),
      patrimony_number: '98746',
      created_by: 'João Pedro',
      is_open: true,
    },
    {
      id: '08d38df3-d121-4d81-937c-a213e06b66df',
      title: 'Torradeira queimou',
      created_at: new Date('2023-08-13T20:24:07.490Z'),
      resolved_at: null,
      patrimony_number: '321789',
      patrimony_id: 'b2737076-dcfe-4d8f-b4b3-76dcafdd99ef',
      created_by: 'kurisu',
      is_open: false,
    },
    {
      id: '08d38df3-d121-4d81-555d-a213e06b66df',
      title: 'Na minha máquina funciona',
      created_at: new Date('2023-08-13T20:24:07.490Z'),
      resolved_at: null,
      patrimony_number: '321789',
      patrimony_id: 'b2737076-ffd7-4d8f-b4b3-76dcafdd99ef',
      created_by: 'Okabe',
      is_open: false,
    },
    {
      id: '19d38df3-775f-4d81-555d-a213e06b66df',
      title: 'Máquina de lavar pifou',
      created_at: new Date('2023-08-13T20:24:07.490Z'),
      resolved_at: null,
      patrimony_number: '458789',
      patrimony_id: 'b2737076-dcfe-4d8f-b4b3-76dcafdd99ef',
      created_by: 'Okabe',
      is_open: true,
    },
    {
      id: '19d38df3-775f-4d81-7779-a213e06b66df',
      title: 'PC desligou sozinho',
      created_at: new Date('2022-08-13T20:24:07.490Z'),
      resolved_at: null,
      patrimony_number: '756789',
      patrimony_id: 'b2737076-dcfe-4d8f-b4b3-76dcafdd99ef',
      created_by: 'Okabe',
      is_open: false,
    },
  ]

  async getAll({ isOpen = true, search = '', patrimonies_ids = [], date }) {
    let orders = this.orders

    orders = orders.filter((order) => order.is_open === isOpen)

    if (search) {
      orders = orders.filter((order) => order.title.includes(search))
    }

    if (patrimonies_ids.length) {
      orders = orders.filter((order) =>
        patrimonies_ids.includes(order.patrimonies_ids)
      )
    }

    if (date) {
      orders = orders.filter((order) => {
        return (
          order.created_at.toISOString().split('T')[0].toString() ===
          date.toString()
        )
      })
    }

    return {
      orders: orders.map((order) => ({
        id: order.id,
        title: order.title,
        patrimony_number: order.patrimony_number,
        created_at: order.created_at,
        created_by: order.created_by,
        is_open: order.is_open,
      })),
      count: orders.length,
    }
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

  async reopen(id) {
    this.orders = this.orders.map((order) =>
      order.id === id
        ? {
            ...order,
            is_open: true,
          }
        : order
    )
  }
}

module.exports = OrderMock
