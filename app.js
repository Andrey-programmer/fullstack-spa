const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

const authRoutes = require('./Routes/auth')
const analyticsRoutes = require('./Routes/analytics')
const categoryRoutes = require('./Routes/category')
const orderRoutes = require('./Routes/order')
const positionRoutes = require('./Routes/position')
const app = express()

app.use(morgan('dev')) //говорит о том что мы находимся в режиме разработки
app.use(bodyParser.urlencoded({extended: true}))//Позволяет правильно парсить символы в URL-адресе
app.use(bodyParser.json()) //перевод json из JS в postman
app.use(cors()) 

app.use('/api/auth', authRoutes)
app.use('/api/analytics', analyticsRoutes)
app.use('/api/category', categoryRoutes)
app.use('/api/order', orderRoutes)
app.use('/api/position', positionRoutes)


module.exports = app