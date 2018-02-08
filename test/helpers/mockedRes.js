module.exports = {
	resultJson: {},
	resultStatus: 200,
	status(code = 200) {
		if (isNaN(code)) throw new Error('status code should be a number.')
		this.status = code
	},
	json(json = {}) {
		this.resultJson = json
	}
}
