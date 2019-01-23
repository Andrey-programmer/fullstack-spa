const Category = require('../Models/Category')
const Position = require('../Models/Position')
const errorHandler = require('../Utils/errorHandler')


module.exports.getAllCategories = async function(request, response) {
    try {
        const categories = await Category.find({user: request.user.id})
        response.status(200).json(categories)
    } catch(error) {
        errorHandler(response, e)
    }
}

module.exports.getCategoryByID = async function(request, response) {
    try {
        // кроме удаления категории нужно удалить позициии, принадлежащие данной категории
        const category = await Category.findById(request.params.id)
        response.status(200).json(categories)
    } catch(error) {
        errorHandler(response, e)
    }
}

module.exports.deleteCategory = async function(request, response) {
    try {
        await Category.remove({_id: request.params.id})
        await Position.remove({category: request.params.id})        
        response.status(200).json({
            message: 'Категория удалена.'
        })
    } catch(error) {
        errorHandler(response, e)
    }
}

module.exports.createCategory = function(request, response) {
    try {

    } catch(error) {
        errorHandler(response, e)
    }
}

module.exports.getAllCategory = function(request, response) {
    try {

    } catch(error) {
        errorHandler(response, e)
    }
}
module.exports.updateCategory = function(request, response) {
    
}