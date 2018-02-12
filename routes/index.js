const router = require('express').Router()

const CategoriesController = require('../controllers/categoriesController')
const DateController = require('../controllers/dateController')
const IdController = require('../controllers/idController')
const NameController = require('../controllers/nameController')
const NumController = require('../controllers/numController')

const catagory = new CategoriesController()
const date = new DateController()
const id = new IdController()
const name = new NameController()
const num = new NumController()

module.exports = router
	.get('/', (req, res) => {
		res.status(200).json({ message: 'Welcome' })
	})
	.get('/catagories', catagory.index)
	.get('/dates', date.index)
	.get('/ids', id.index)
	.get('/names', name.index)
	.get('/nums', num.index)
