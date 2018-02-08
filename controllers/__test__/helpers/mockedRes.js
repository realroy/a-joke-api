module.exports = {
  resultJson: {},
  resultStatus: 200,
  status (code) {
    this.status = 200
  }
  json (json) {
    this.resultJson = json
  }
}