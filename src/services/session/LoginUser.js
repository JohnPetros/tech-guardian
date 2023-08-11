const User = require('../../models/user')

class LoginUser {
  execute(email) {
    const user = new User().findByEmail(email)

    if (!user) {
      return false
    }

    if (!user.password) {
      return false
    }
  }
}

module.exports = LoginUser