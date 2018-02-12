const router = require('express').Router()
const QueryController = require('../controllers/queryController')

// module.exports = router
// 	.get('/', QueryController.index)
// 	.post('/', QueryController.create)
// 	.get('/:id', QueryController.read)
// 	.put('/:id', QueryController.update)
// 	.delete('/:id', QueryController.delete)

module.exports = new QueryController().router
