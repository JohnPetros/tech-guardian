class FlashMessage {
  routes = {
    '/new-order': ['title', 'patrimony_id', 'description'],
    '/': ['email'],
    '/order': ['order_id', 'title', 'patrimony_id', 'description'],
    '/register': ['name', 'email', 'role_id'],
  }

  constructor(flash) {
    this.flash = flash
  }

  add(type, message) {
    this.flash(type, message)
  }

  addMultipleByRoute(route, data) {
    for (const [type, message] of Object.entries(data)) {
      const canBeVisible = this.routes[route]?.includes(type)

      if (!canBeVisible) {
        continue
      }

      this.add(type, message)
    }
  }
}

module.exports = FlashMessage
