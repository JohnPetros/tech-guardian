const { Router } = require('express')

const sessionRouter = require('./session.routes')
const ordersRouter = require('./orders.routes')

const router = Router()

router.use(sessionRouter)

router.use(ordersRouter)

// Route Not Found
router.get('*', (_, response) =>
  response.status(404).render('pages/not-found.ejs')
)

module.exports = router
