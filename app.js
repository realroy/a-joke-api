const express = require('express')
const logger = require('morgan')
const bodyParser = require('body-parser')

const names = require('./routes/names')
const index = require('./routes/index')
const queries = require('./routes/queries')
const categories = require('./routes/categories')
const ids = require('./routes/ids')
const dates = require('./routes/dates')

const app = express()

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/', index)
app.use('/queries', queries)
app.use('/names', names)
app.use('/categories', categories)
app.use('/ids', ids)
app.use('/dates', dates)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error('Not Found')
	err.status = 404
	next(err)
})

// error handler
app.use(function(err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message
	res.locals.error = req.app.get('env') === 'development' ? err : {}

	// render the error page
	res.status(err.status || 500)
	res.json({ type: 'error', values: err.status })
})

module.exports = app
