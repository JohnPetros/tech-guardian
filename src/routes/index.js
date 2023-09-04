const { Router } = require('express')

const sessionRouter = require('./session.routes')
const ordersRouter = require('./orders.routes')
const patrimoniesRouter = require('./patrimonies.routes')
const usersRouter = require('./users.routes')

const router = Router()

router.use(sessionRouter)

router.use(ordersRouter)

router.use(patrimoniesRouter)

router.use(usersRouter)

// Route Not Found
router.get('*', (_, response) =>
  response.status(404).render('pages/not-found.ejs')
)

module.exports = router
