const mongoose = require('mongoose')

const schema = mongoose.Schema({
	categories: {
		type: [String],
		default: ['Unknown'],
		enum: ['Unknown', 'explicit', 'nerdy']
	},
	jokeId: { type: Number, min: 0, default: 0 },
	name: { type: String, default: 'Chuck Norris' },
	num: { type: Number, min: 0, default: 0 },
	date: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Query', schema)
