module.exports.login = function(request, response) {
    response.status(200).json({
        login: 'from controller'
    })
}

module.exports.registr = function(request, response) {
    response.status(200).json({
        registr: 'from controller'
    })
} 