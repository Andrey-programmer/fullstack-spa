const mongoose = require('mongoose')
const Schema = mongoose.Schema

const orderSchema = new Schema({
    date: {
        type: Date,
        default: Date.now// не вызываем метод время добавляется автоматически
    },
    order: {
        type: Number,
        required: true
    },
    list: [
        {
            name: {
                type: String
            },
            quantity: {
                type: Number
            },
            cost: {
                type: Number
            }
        }
    ],
    user: {
        ref: 'users', //указываем что это будет коллекция users,
        type: Schema.Types.ObjectId // указываем что это тип генерируемый ID mongoose
    }
})

module.exports = mongoose.model('orders', orderSchema)