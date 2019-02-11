const moment = require('moment')
const Order = require('../Models/Order')
const errorHandler = require('../Utils/errorHandler')

module.exports.overview = async function(request, response) {
    try {
        // сортируем массив заказов по возрастанию
        const allOrders = await Order.find({user: request.user.id}).sort({date: 1})
        const ordersMap = getOrdersMap(allOrders)
        // Заказы за вчера
        const yesterdayOrders = ordersMap[moment().add(-1, 'd').format('DD.MM.YYYY')] || []
        // Количество заказов за вчера
        const yesterdayOrdersNumber = yesterdayOrders.length

        // количество заказов
        const totalOrdersNumber = allOrders.length
        // количество дней всего
        const daysNumber = Object.keys(ordersMap).length
        // Среднее количество заказов в день (округленное)
        const middleOrdersDay = (totalOrdersNumber/daysNumber).toFixed(0)
        // Процент для количества заказов
        // ((заказов вчера / среднее количество заказов в день) - 1) * 100
        const ordersPercent = (((yesterdayOrdersNumber / middleOrdersDay) - 1) * 100).toFixed(2)
        // Общая выручка
        const totalMoney = calculatePrice(allOrders)
        // Cредняя выручка в день
        const middleMoneyForDay = totalMoney/ daysNumber
        // Выручка за вчера
        const moneyForYesterday = calculatePrice(yesterdayOrders)
        // Процент выручки
        const moneyPercent = (((moneyForYesterday / middleMoneyForDay) - 1) * 100).toFixed(2)
        // Сравнение выручки
        const compireMoney = (moneyForYesterday - middleMoneyForDay).toFixed(2)
        // Сравнение количества заказов
        const compireNumberOrders = (yesterdayOrdersNumber - middleOrdersDay).toFixed(2)

        // Формируем выходные данные
        response.status(200).json({
            money: { 
                percent: Math.abs(+moneyPercent),
                compire:  Math.abs(compireMoney),
                yesterday: +moneyForYesterday,
                isHigher: moneyPercent > 0
            },
            orders: {
                percent: Math.abs(+ordersPercent),
                compire:  Math.abs(+compireNumberOrders),
                yesterday: +yesterdayOrdersNumber,
                isHigher: ordersPercent > 0
            }
        })

    } catch (error) {
        errorHandler(response, error)
    }
}
module.exports.analytics = function(request, response) {
    response.get('/overview') 
} 

function getOrdersMap(orders = []) {
    const daysOrder = {}
    orders.forEach(order => {
        const date = moment(order.date).format('DD.MM.YYYY')

        if(date === moment().format('DD.MM.YYYY')) {
            return
        }

        if(!daysOrder[date]) {
            daysOrder[date] = []
        } else {
            daysOrder[date].push(order)
        }

        // По факту тут формируется объект из массива дат в которые входит массив объектов заказов
// daysOrder {
        //     '13.02.1983' : [
        //         { // order}, 
        //         { // order}, 
        //         { // order}, 
        //         { // order}, 
        //     ]
        //   }
    })
    return daysOrder
}

// Считаем общий доход по заказам
function calculatePrice(orders = []) {
    return orders.reduce((total, order) => {
        const orderPrice = order.list.reduce((orderTotal, item) => {
            return orderTotal += item.cost * item.quantity
        }, 0)
        return total += orderPrice
    }, 0)
}