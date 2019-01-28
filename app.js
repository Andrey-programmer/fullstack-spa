const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const passport = require('passport')

const keys = require('./config/keys')
const authRoutes = require('./Routes/auth')
const analyticsRoutes = require('./Routes/analytics')
const categoryRoutes = require('./Routes/category')
const orderRoutes = require('./Routes/order')
const positionRoutes = require('./Routes/position')
const app = express()

//{ useNewUrlParser: true, useCreateIndex: true } - настройки для исключения пердупреждений версионности
mongoose.connect(keys.mongoURL, { useNewUrlParser: true,
    useCreateIndex: true })
    .then(() => {
        console.log('MongoDB connected')
    }).catch(error => {
        console.log(error)
    })

app.use(passport.initialize())
require('./Middleware/passport')(passport)

app.use(morgan('dev')) //говорит о том что мы находимся в режиме разработки
app.use('/files', express.static('files'))//Делаем картинку статической 
        // чтобы посмотреть в браузере адрес статической картинки копируем из базы данных изменяя "//" на "/"
        // например в базе  "imageSrc": "files\\23012019-144348_977-Cat.jpg",
        // мы ищем по адресу http://localhost:5000/files/23012019-144348_977-Cat.jpg

app.use(bodyParser.urlencoded({extended: true}))//Позволяет правильно парсить символы в URL-адресе
app.use(bodyParser.json()) //перевод json из JS в postman
app.use(cors()) 

app.use('/api/auth', authRoutes)
app.use('/api/analytics', analyticsRoutes)
app.use('/api/category', categoryRoutes)
app.use('/api/order', orderRoutes)
app.use('/api/position', positionRoutes)


module.exports = app