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

function handleSort(query) {
	if (!query['sort_by']) return -1
	return ['ascending', 'asc', '1'].includes(query['sort_by']) ? 1 : -1
}

exports.formatJSON = formatJSON
exports.handleError = handleError
exports.handleResponse = handleResponse
exports.handleSort = handleSort
exports.withModel = withModel
