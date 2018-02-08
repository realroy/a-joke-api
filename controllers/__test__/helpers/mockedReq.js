module.exports = function({ params = {}, query = {}, body = {} }) {
	return {
		params,
		query,
		body
	}
}
