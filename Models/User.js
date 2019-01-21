const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }    
})

//"users" - так будет называться поле в базе данных на сервере
module.exports = mongoose.model('users', userSchema) 