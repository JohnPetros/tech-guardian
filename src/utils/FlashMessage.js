class FlashMessage {
  routes = {
    '/new-order': ['title', 'patrimony_id', 'description'],
    '/': ['email'],
  }

  constructor(flash) {
    this.flash = flash
  }

  add(type, message) {
    this.flash(type, message)
  }

  addMultipleByRoute(route, data) {
    for (const [type, message] of Object.entries(data)) {
      if (!this.routes[route].includes(type)) {
        continue
      }

      this.add(type, message)
    }
  }
}

module.exports = FlashMessage
