const router = require('express').Router()

const NumController = require('../controllers/numController')

const c = new NumController()

module.exports = router.get('/', c.index)

