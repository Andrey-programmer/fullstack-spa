const express = require('express')
const controller = require('../Controllers/authController')
const router = express.Router()

//localhost:5000/api/auth/login
router.post('/login', controller.login)
//localhost:5000/api/auth/login
router.post('/registr', controller.registr) 

module.exports = router