const route = require('express').Router()

const CategoriesController = require('../controllers/categoriesController')
const c = new CategoriesController()

module.exports = route.get('/', c.index)