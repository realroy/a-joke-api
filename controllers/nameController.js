const Query = require('../models/query')
const { formatJSON, handleError, handleSort } = require('./helpers')

function nameController() {
  const Model = Query
	this.index = async function(req, res, next) {
		try {
			const values = await Model.aggregate([
				{ $group: { _id: '$name', count: { $sum: 1 } } },
				{ $sort: { count: handleSort(req.query) }},
			])
			const json = await formatJSON(null, values, Model)
			res.status(200).json(json)
		} catch (error) {
			handleError(res, error)
		}
	}
}

module.exports = nameController
