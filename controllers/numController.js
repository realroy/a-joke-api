const BaseController = require('./baseController')
const Query = require('../models/query')
const { handleSort } = require('./helpers')

module.exports = class NumController extends BaseController {
	index() {
		return async (req, res) => {
			try {
				const values = await this.Model.aggregate([
					{ $group: { _id: '$num', count: { $sum: 1 } } },
					{ $sort: { count: handleSort(req.query) } }
				])
				this.handleResponse(res, values)
			} catch (error) {
				this.handleError(res, error)
			}
		}
	}
}

