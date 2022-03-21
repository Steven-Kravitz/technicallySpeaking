const router = require('express').Router()

const homeRoutes = require('./homeRoutes.js')
const apiRoutes = require('./api')
const dashRoutes = require('./dashRoutes.js')

router.use('/api', apiRoutes)
router.use('/', homeRoutes)
router.use('/dashboard', dashRoutes)

module.exports = router