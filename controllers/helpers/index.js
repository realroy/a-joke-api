function withModel (Model, func) {
	func.Model = Model
	return func
}

async function formatJSON(errors = [], values = [], model) {
	try {
		const total = await model.count()
		return { errors, values, total }
	} catch (error) {
		return { errors, values, total: 0 }
	}
}

async function handleResponse (res, value, Model) {
	const json = await formatJSON(null, values, Model)
	res.status(200).json(json)
}
async function handleError(res, error) {
	const json = await formatJSON(error, null)
	res.status(500).json(json)
}

function sortAggregater(query) {
	let count = -1
	if (query['sort_by']) {
		count = ['ascending', 'asc', '1'].includes(query['sort_by']) ? 1 : -1
	}
	return [{ $sort: { count } }]
}

function groupAggregater(query) {
	if(!query['group_by']) return [{}]
	if(query['group_by'] === 'categories') {
		return [
			...unwindAggregater(query['group_by']),
			{ $group: { _id: '$'.concat(query['group_by']), count: { $sum: 1 } } }
		]
	}
	return [{ $group: { _id: '$'.concat(query['group_by']), count: { $sum: 1 } } }]
}

function unwindAggregater(attribute) {
	return [{ $unwind: '$'.concat(attribute) }]
}

exports.formatJSON = formatJSON
exports.handleError = handleError
exports.handleResponse = handleResponse
exports.sortAggregater = sortAggregater
exports.groupAggregater = groupAggregater
exports.unwindAggregater = unwindAggregater
exports.withModel = withModel
