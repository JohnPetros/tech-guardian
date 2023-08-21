class PatrimonyModel {
  patrimonies = [
    {
      id: 'b2737076-dcfe-4d8f-b4b3-76dcafdd99ef',
      number: '147456',
    },
  ]

  async getAll() {
    return this.patrimonies
  }

  async getById(id) {
    return this.patrimonies.find((patrimony) => patrimony.id === id)
  }
}

module.exports = PatrimonyModel
