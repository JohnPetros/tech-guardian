class GetOrderFormActionService {
  constructor(user) {
    this.user = user
  }

  execute() {
    switch (this.user.role) {
      case 'tech':
        return 'manage'
      case 'guardian':
        return 'resolve'
      default:
        return 'manage'
    }
  }
}

module.exports = GetOrderFormActionService