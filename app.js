const express = require('express')
const logger = require('morgan')
const bodyParser = require('body-parser')

const connection = require('./db')()

const names = require('./routes/names')
const index = require('./routes/index')
const queries = require('./routes/queries')

const app = express()

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/', index)
app.use('/queries', queries)
app.use('/names', names)
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
