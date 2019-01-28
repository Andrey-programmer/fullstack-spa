const express = require('express')
const passport = require('passport')
const controller = require('../Controllers/orderController')
const router = express.Router()

router.post('/', passport.authenticate('jwt', {session: false}), controller.createOrder)
router.get('/', passport.authenticate('jwt', {session: false}), controller.getOrders) 

module.exports = router