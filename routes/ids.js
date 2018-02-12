const route = require('express').Router()

const IdController = require('../controllers/idController')

const c = new IdController()

module.exports = route.get('/', c.index)