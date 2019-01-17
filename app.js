const express = require('express')
const authRoutes = require('./Routes/auth')
const analyticsRoutes = require('./Routes/analytics')
const categoryRoutes = require('./Routes/category')
const orderRoutes = require('./Routes/order')
const positionRoutes = require('./Routes/position')
const app = express()


app.use('/api/auth', authRoutes)
app.use('/api/analytics', analyticsRoutes)
app.use('/api/category', categoryRoutes)
app.use('/api/order', orderRoutes)
app.use('/api/position', positionRoutes)


module.exports = app