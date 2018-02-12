const debug = require('debug')('controller:categories')
const Query = require('../models/query')
const { handleResponse, handleError, handleSort, withModel } = require('./helpers')

module.exports = withModel(Query, function () {
	this.index = async function(req, res, next) {
		try {
			const values = await this.Model.aggregate([
        { $unwind: '$categories' },
				{ $group: { _id: '$categories', count: { $sum: 1 } } },
				{ $sort: { count: handleSort(req.query) }},
			])
			handleResponse(res, values, this.Model)
		} catch (error) {
			handleError(res, error)
		}
	}
})
