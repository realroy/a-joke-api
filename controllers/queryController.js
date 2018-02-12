const debug = require('debug')('query:controller')

const Query = require('../models/query')
const BaseController = require('../controllers/baseController')
const { sortAggregater, groupAggregater } = require('./helpers')

module.exports = class QueryController extends BaseController {
	constructor() {
		super(Query)
		this.router
			.get('/', this.index())
			.post('/', this.create())
			.get('/:id', this.read())
			.put('/:id', this.update())
			.delete('/:id', this.delete())
	}

	validateReqBody({ name, jokeId, num, categories }) {
		console.log(categories)
		return {
			name,
			jokeId: jokeId,
			num: jokeId >= 1 ? 0 : num,
			categories: Array.isArray(categories)
				? categories.map(c => (c === '' ? 'Unknown' : c))
				: undefined
		}
	}

	index() {
		return async (req, res) => {
			try {
				const values = (Object.keys(req.query).length === 0)
				? await this.Model.find()
				: await this.Model.aggregate([
					...groupAggregater(req.query),
					...sortAggregater(req.query)
				])
				super.handleResponse(res, values)
			} catch (error) {
				super.handleError(res, error)
			}
		}
	}
	create() {
		return async (req, res) => {
			try {
				const values = this.validateReqBody(req.body)
				const value = await new this.Model(values).save()
				super.handleResponse(res, value)
			} catch (error) {
				super.handleError(res, error)
			}
		}
	}
	read() {
		return async (req, res) => {
			try {
				const value = await this.Model.findById(req.params.id)
				super.handleResponse(res, value)
			} catch (error) {
				super.handleError(res, error)
			}
		}
	}
	update() {
		return async (req, res) => {
			try {
				const value = await this.Model.findByIdAndUpdate(req.params.id, req.body)
				super.handleResponse(res, value)
			} catch (error) {
				super.handleError(res, error)
			}
		}
	}
	delete() {
		return async (req, res) => {
			try {
				await this.Model.findByIdAndRemove(req.params.id)
				super.handleResponse(res, [])
			} catch (error) {
				super.handleError(res, error)
			}
		}
	}
}
