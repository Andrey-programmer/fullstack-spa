const Order = require('../Models/Order')
const errorHandler = require('../Utils/errorHandler')

//(get)localhost:5000/api/order?offset=2&limit=5
module.exports.getOrders = async function(request, response) {

    const query = {
        user: request.user.id
    }

    //Дата старта (фильтр начала отсчета)
    if (request.query.start) {
        query.date = {
            //специальный фильтр в mongoose $gte(больше или равно)
            $gte: request.query.start
        }
    }

    // Фильтр конца отсчета
    if (request.query.end) {
        // если нет поля даты заказа
        if (!query.date) {
            query.date = {}
        }
        //специальный фильтр в mongoose $lte(меньше или равно)
        query.date['$lte'] = request.query.end
    }

    if (request.query.order) {
        query.order = +request.query.order
    }

    try {
        const orders = await Order.find(query) //будем передавать квери параметры через командную строку
            .sort({date: -1})//Сортируем и берем первый с конца
            .skip(+request.query.offset)//сколько знаков пропустить тоже передаем как query-параметр
            .limit(+request.query.limit) //количество позиций

        response.status(200).json(orders)
        
    } catch(error) {
        errorHandler(response, error)
    }
} 

module.exports.createOrder = async function(request, response) {
    console.log(request)
    try {
        const lastOrder = await Order
            .findOne({  
                user: request.user.id
            }).sort({date: -1}) //сортируем заказы по дате и получаем последний

        //если заказ после сортировки найден , то позучаем номер этого заказа,
        // иначе используем номер по умолчанию
        const maxOrder = lastOrder ? lastOrder.order : 0

        const order = await new Order({
            list: request.body.list,
            user: request.user.id,
            order: maxOrder + 1
        }).save()
        response.status(201).json(order)
    } catch(error) {
        errorHandler(response, error)
    }
   
} 