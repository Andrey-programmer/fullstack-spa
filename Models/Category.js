const mongoose = require('mongoose')
const Schema = mongoose.Schema

const categorySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    imageSrc: {
        type: String,
        default: ''
    },
    user: {
        ref: 'users', //указываем что это будет коллекция users,
        type: Schema.Types.ObjectId // указываем что это тип генерируемый ID mongoose
    }
})

module.exports = mongoose.model('categories', categorySchema)