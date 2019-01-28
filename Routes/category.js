const express = require('express')
const passport = require('passport')

const upload = require('../Middleware/upload')
const controller = require('../Controllers/categoryController')
const router = express.Router()

router.get('/', passport.authenticate('jwt', {session: false}), controller.getAllCategories)
router.get('/:id', passport.authenticate('jwt', {session: false}), controller.getCategoryByID) 
router.delete('/:id', passport.authenticate('jwt', {session: false}), controller.deleteCategory) 
router.post('/', passport.authenticate('jwt', {session: false}), upload.single('image'), controller.createCategory) 
router.patch('/:id', passport.authenticate('jwt', {session: false}), upload.single('image'), controller.updateCategory) 
 
module.exports = router