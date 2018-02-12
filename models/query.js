const mongoose = require('mongoose')

const createSchema = () => {
	const date = new Date()
	return {
		categories: {
			type: [String],
			default: ['Unknown'],
			enum: ['Unknown', 'explicit', 'nerdy']
		},
		jokeId: { type: Number, min: 0, default: 0 },
		name: { type: String, default: 'Chuck Norris' },
		num: { type: Number, min: 0, default: 0 },
		day: { type: String, default: date.getDay() },
		date: { type: Number, default: date.getDate() },
		month: { type: Number, default: date.getMonth() },
		year: { type: Number, default: date.getFullYear() },
		createAt: { type: Date, default: date }
	}
}

const schema = mongoose.Schema(createSchema())

module.exports = mongoose.model('Query', schema)
