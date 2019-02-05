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
        response.status(200).json(category)
    } catch(error) {
        errorHandler(response, error)
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

module.exports.createCategory = async function(request, response) {
    // console.log(request.user)
    const category = new Category({
        name: request.body.name,
        user: request.user.id,
        imageSrc: request.file ? request.file.path : ''
    })
    
    try {
        await category.save(category) 
        response.status(201).json(category)
    } catch(error) {
        errorHandler(response, error)
    }
}

module.exports.updateCategory = async function(request, response) {
    const updated = {
        name: request.body.name
    }

    if (request.file) {
        updated.imageSrc = request.file.path
    }

    try {
        const category = await Category.findOneAndUpdate(
            {_id: request.params.id},
            {$set: updated},
            {new: true}
        )
        response.status(200).json(category)
    } catch(error) {
        errorHandler(response, e)
    }
}