const User = require('../models/User')

module.exports.login = function(request, response) {
    response.status(200).json({
        login: {
            email: request.body.email ,
            password: request.body.password
        }
    })
}

module.exports.register = function(request, response) {
    const user = new User({
        email: request.body.email,
        password: request.body.password
    })
 
    user.save().then(() => {
        console.log('User created')
    }) 
}