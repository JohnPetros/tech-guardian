class MockRole {
  roles = [
    {
      id: '427bdd37-e893-45d3-bdf5-cc77d9f666db',
      title: 'tech',
      is_restrict: false,
    },
    {
      id: 'e7b17291-09df-4858-b21b-2c186e219a44',
      title: 'guardian',
      is_restrict: false,
    },
    {
      id: '828a3599-3fe6-48d3-a637-9036df358cd2',
      title: 'admin',
      is_restrict: true,
    },
  ]

  async getUnrestrictedRoles() {
    return this.roles.filter((role) => role.is_restrict === false)
  }

  async getRoleName(id) {
    return this.roles.filter((role) => role.id === id).name
  }
}

module.exports = MockRole
