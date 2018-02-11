const mongoose = require('mongoose')
const debug = require('debug')('db:index')
require('dotenv').config()

const getDbURL = (env) => {
	switch (env.NODE_ENV) {
	case 'production':
		return env.DB_PROD_URL
	case 'development':
		return env.DB_DEV_URL
	case 'test':
		return env.DB_TEST_URL
	default:
		return ''
	}
}

module.exports = () => {
	const url = getDbURL(process.env)
	mongoose.Promise = global.Promise
	mongoose.connect(url)
	return mongoose.connection
}
