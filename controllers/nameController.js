const Query = require('../models/query')
const BaseController = require('./baseController')
const { handleError } = require('./helpers')

module.exports = class nameController extends BaseController {
	index() {
		return async (req, res, next) => {
			try {
				const values = await this.Model.aggregate([
					{ $group: { _id: '$name', count: { $sum: 1 } } },
					{ $sort: { count: handleSort(req.query) } }
				])
				this.handleResponse(res, values)
			} catch (error) {
				this.handleError(res, error)
			}
		}
	}
}
