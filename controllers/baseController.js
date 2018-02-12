const debug = require('debug')('controller:base')
const router = require('express').Router()

const { formatJSON } = require('../controllers/helpers')

module.exports = class baseController {
	constructor(Model) {
		this.Model = Model
		this.router = router
	}
	handleResponse(res, values = []) {
		formatJSON(null, values, this.Model).then(result =>
			res.status(200).json(result)
		)
	}
	handleError(res, error = []) {
		formatJSON(error, null).then(result => res.status(500).json(result))
	}
}
