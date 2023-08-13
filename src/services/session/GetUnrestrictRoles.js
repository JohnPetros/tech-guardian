class GetUnrestrictRoles {
  constructor(role) {
    this.role = role
  }

  async execute() {
    return await this.role.getUnrestrictedRoles()
  }
}

module.exports = GetUnrestrictRoles
