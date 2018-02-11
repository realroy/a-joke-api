exports.formatJSON = async function formatJSON(
	errors = [],
	values = [],
	model
) {
	try {
		const total = await model.count()
		return { errors, values, total }
	} catch (error) {
		return { errors, values, total: 0 }
	}
}
exports.handleError = async function handleError(res, error) {
	const json = await formatJSON(error, null)
	res.status(500).json(json)
}

exports.handleSort = function handleSort(query) {
	if (!query['sort_by']) return -1
	return ['ascending', 'asc', '1'].includes(query['sort_by']) ? 1 : -1
}
