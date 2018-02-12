const route = require('express').Router()

const DateController = require('../controllers/dateController')

const c = new DateController()

module.exports = route
	.get('/', c.index)
