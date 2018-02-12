const debug = require('debug')('controller:idController')
const Query = require('../models/query')
const { handleResponse, handleError, handleSort } = require('./helpers')

const handleGroupBy = (query = { groupBy: 'day' }) => {
	switch (query.groupBy) {
		case 'date':
			return '$date'
		case 'day':
			return '$day'
		case 'month':
			return '$month'
		case 'year':
			return '$year'
		default:
			return '$day'
	}
}

function dateController() {
	const Model = Query
	this.index = async function(req, res, next) {
		try {
			const values = await Model.aggregate([
				{ $group: { _id: handleGroupBy(req.query), count: { $sum: 1 } } },
				{ $sort: { count: handleSort(req.query) } }
			])
			handleResponse(res, values, Model)
		} catch (error) {
			handleError(res, error)
		}
	}
}

module.exports = dateController
