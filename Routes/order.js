const express = require('express')
const controller = require('../Controllers/orderController')
const router = express.Router()

router.post('/', controller.createOrder)
router.get('/', controller.getOrders) 

module.exports = router