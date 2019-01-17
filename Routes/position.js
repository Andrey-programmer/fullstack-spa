const express = require('express')
const controller = require('../Controllers/positionController')
const router = express.Router()

router.get('/:categoryID', controller.getByCategoryID)
router.post('/', controller.createPosition) 
router.patch('/:id', controller.updatePosition) 
router.delete('/:id', controller.removePosition) 

module.exports = router