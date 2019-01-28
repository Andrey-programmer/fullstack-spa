// данный код берем из https://github.com/themikenicholson/passport-jwt

const JwtStratagy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const keys = require('../config/keys')
const mongoose = require('mongoose')
const User = mongoose.model('users')

//Получаем token из заголовка
const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: keys.jwt
}

module.exports = (passport) => {
    //Добавляем паспорту новую стратегию
    passport.use(
        new JwtStratagy(options, async (payload, done) => {
           
            try {
                const user = await User.findById(payload.userId).select('email id')

                if (user) {
                    done(null, user) // где null если error
                } else {
                    done(null, false)
                }
            } catch(error) {
                console.log(error)
            }
          
        })
    )
}