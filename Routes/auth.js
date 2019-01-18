const express = require('express')
const controller = require('../Controllers/authController')
const router = express.Router()

//Для постмана http://localhost:5000/api/auth/login
router.post('/login', controller.login)
//Для постмана http://localhost:5000/api/auth/register
router.post('/register', controller.register) 

module.exports = router