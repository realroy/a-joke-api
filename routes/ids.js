const route = require('express').Router()

const IdController = require('../controllers/IdController')

const c = new IdController()

module.exports = route.get('/', c.index)