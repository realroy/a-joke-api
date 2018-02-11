const router = require('express').Router()
const QueryController = require('../controllers/queryController')

const q = new QueryController()

module.exports = router
	.get('/', q.index)
	.post('/', q.create)
	.get('/:id', q.read)
	.put('/:id', q.update)
	.delete('/:id', q.delete)
