// module.exports = (args = { params: {}, query: {}, body: {} }) => args

function MockedRequest() {
	this.params = {}
	this.query = {}
	this.body = {}
}

module.exports = MockedRequest
