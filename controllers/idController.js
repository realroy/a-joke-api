const debug = require('debug')('controller:idController')
const Query = require('../models/query')
const { formatJSON, handleError, handleSort } = require('./helpers')

function idController() {
  const Model = Query
	this.index = async function(req, res, next) {
		try {
			const values = await Model.aggregate([
				{ $group: { _id: '$jokeId', count: { $sum: 1 } } },
				{ $sort: { count: handleSort(req.query) }},
      ])
      console.log(values)
			const json = await formatJSON(null, values, Model)
			res.status(200).json(json)
		} catch (error) {
			handleError(res, error)
		}
	}
}

module.exports = idController
