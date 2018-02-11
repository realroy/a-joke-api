'use strict'

const debug = require('debug')('base:controller')

module.exports = function BaseControlle(model) {
	this.Model = model
	const formatJSON = async (errors = [], values = []) => {
		try {
			const total = await this.Model.count()
			return { errors, values, total }
		} catch (error) {
			return { errors, values, total: 0 }
		}
	}
	const handleError = async (res, error) => {
		const json = await formatJSON(error, null)
		res.status(500).json(json)
	}
	this.index = async (req, res) => {
		try {
			const values = await this.Model.find()
			const json = await formatJSON(null, values)
			res.status(200).json(json)
		} catch (error) {
			handleError(res, error)
		}
	}
	this.create = async (req, res) => {
		try {
			const values = {
				name: req.body.name,
				jokeId: req.body.jokeId,
				num: req.body.jokeId >= 1 ? 0 : req.body.num,
				categories: Array.isArray(req.body.categories)
					? req.body.categories.map(c => (c === '' ? 'Unknown' : c))
					: undefined
			}
			const value = new this.Model(values)
			await value.save()
			const json = await formatJSON(null, value)
			res.status(200).json(json)
		} catch (error) {
			handleError(res, error)
		}
	}
	this.read = async (req, res) => {
		try {
			const query = await this.Model.findById(req.params.id)
			const json = await formatJSON(null, value)
			res.status(200).json(json)
		} catch (error) {
			handleError(res, error)
		}
	}
	this.update = async (req, res) => {
		try {
			await this.Model.findByIdAndUpdate(req.params.id, req.body)
			const query = await this.Model.findById(req.params.id)
			const json = await formatJSON(null, query)
			res.status(200).json(json)
		} catch (error) {
			handleError(res, error)
		}
	}
	this.delete = async (req, res) => {
		try {
			const query = await this.Model.findByIdAndRemove(req.params.id)
			const json = await formatJSON(null, value)
			res.status(200).json(json)
		} catch (error) {
			handleError(res, error)
		}
	}
}
