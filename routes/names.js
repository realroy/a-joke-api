const router = require('express').Router()

const NameController = require('../controllers/nameController')

const c = new NameController()

module.exports = router.get('/', c.index)

