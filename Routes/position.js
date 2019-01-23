const express = require('express')
const controller = require('../Controllers/positionController')
const router = express.Router()

router.get('/:categoryID', passport.authenticate('jwt', {session: false}), controller.getByCategoryID)
router.post('/', passport.authenticate('jwt', {session: false}), controller.createPosition) 
router.patch('/:id', passport.authenticate('jwt', {session: false}), controller.updatePosition) 
router.delete('/:id', passport.authenticate('jwt', {session: false}), controller.removePosition)

module.exports = router