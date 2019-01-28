const Position = require('../Models/Position')
const errorHandler = require('../Utils/errorHandler')

module.exports.getByCategoryID = async function(request, response) {
    try {
        const positions = await Position.find({
            category: request.params.categoryID,
            user: request.user.id
        })
        response.status(200).json(positions)
    } catch(error) {
        errorHandler(response, error)
    }
}

module.exports.createPosition = async function(request, response) {
    try {
        const position = await new Position({
            name: request.body.name,
            cost: request.body.cost,
            category: request.body.category,
            user: request.user.id
        }).save()
        response.status(201).json(position)
    } catch(error) {
        errorHandler(response, error)
    }
}

module.exports.removePosition = async function(request, response) {
    try {
        await Position.remove({
            _id: request.params.id
        })
        response.status(200).json({
            message: 'Позиция была удалена.'
        })
    } catch(error) {
        errorHandler(response, error)
    }
}

module.exports.updatePosition = async function(request, response) {
    try {
        const position = await Position.findOneAndUpdate(
            {_id: request.params.id}, //то что мы должны заменить
            {$set: request.body}, //устанавливаем новое тело
            {new: true} // подтверждение обновления
            )
        response.status(200).json({position})
    } catch(error) {
        errorHandler(response, error)
    }
}