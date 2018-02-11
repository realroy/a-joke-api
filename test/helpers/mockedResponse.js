// module.exports = () => {
// 	let _json = {}
// 	let _status = 200
// 	return {
// 		status(code = 200) {
// 			if (isNaN(code)) throw new Error('status code should be a number.')
// 			_status = code
// 			return this
// 		},
// 		json(json = {}) {
// 			_json = json
// 			return this
// 		},
// 		getJson() {
// 			return _json
// 		},
// 		getStatus() {
// 			return _status
// 		}
// 	}
// }
function MockedRespond () {
	this._json = undefined
	this.statusCode = 200
}

MockedRespond.prototype.json = function (json) {
	this._json = json
	return this
}

MockedRespond.prototype.status = function (code) {
	this.statusCode = code
	return this
}

module.exports = MockedRespond