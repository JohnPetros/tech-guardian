const uuid = require('uuid')
class PatrimonyMock {
  patrimonies = [
    {
      id: 'b2737076-dcfe-4d8f-b4b3-76dcafdd99ef',
      number: '147456',
    },
    {
      id: '4ba2af62-552b-4225-b5d8-157f3369e654',
      number: '98746',
    },
  ]

  async getAll() {
    return this.patrimonies
  }

  async getById(id) {
    return this.patrimonies.find((patrimony) => patrimony.id === id)
  }

  async getByNumber(number) {
    return this.patrimonies.find((patrimony) => patrimony.number === number)
  }

  async create(number) {
    this.patrimonies.push({
      id: uuid.v4(),
      number,
    })
  }

  async edit(id, number) {
    this.patrimonies = this.patrimonies.map((patrimony) =>
      patrimony.id === id ? { ...patrimony, number } : patrimony
    )
  }

  async delete(id) {
    this.patrimonies = this.patrimonies.filter(
      (patrimony) => patrimony.id !== id
    )
  }
}

module.exports = PatrimonyMock
