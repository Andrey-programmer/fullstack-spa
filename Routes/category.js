const express = require('express')
const controller = require('../Controllers/categoryController')
const router = express.Router()

router.get('/', controller.getAllCategories)
router.get('/:id', controller.getCategoryByID) 
router.delete('/:id', controller.deleteCategory) 
router.post('/', controller.createCategory) 
router.patch('/:id', controller.updateCategory) 

module.exports = router