class ServerError {
  constructor(page, message, pageData, status = 400) {
    this.page = page
    this.message = message
    this.pageData = pageData
    this.status = status
  }
}

module.exports = ServerError
