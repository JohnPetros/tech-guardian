class FlashMessage {
  routes = {
    '/new-order': ['title', 'patrimony_id', 'description'],
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

      console.log(route, message);
      this.add(type, message)
    }
  }
}

module.exports = FlashMessage
