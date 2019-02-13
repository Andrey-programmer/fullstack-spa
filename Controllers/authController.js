const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('../Models/User')
const keys = require('../config/keys')
const errorHandler = require('../Utils/errorHandler')

module.exports.login = async function(request, response) {
    
    //ищем пользователя по email в базе данных
    const candidate = await User.findOne({
        email: request.body.email
    })

    if (candidate) {
        //Проверка пароля пользователя (локальный пароль, глобальный пароль)
        const passwordResult = bcrypt.compareSync(request.body.password, 
        candidate.password)

        if (passwordResult) {
            //Генерируем токен, пароли совпали
            const token = jwt.sign({
                email: candidate.email,
                userId: candidate._id
            }, keys.jwt, {expiresIn: 60*60}) //60*60 - токен будет действовать час

            response.status(200).json({
                token: `Bearer ${token}` //Bearer - необходимо для правильно синтаксиса
            })

        } else {
            // Пароли несовпали
            response.status(401).json({
                message: 'Пароли несовпадают. Попробуйте снова.'
            })
        }

    } else {
        //Пользователя нет. ошибка
        response.status(404).json({
            message: 'Пользователь с таким email не найден!'
        })
    } 

    /* response.status(200).json({
        login: {
            email: request.body.email ,
            password: request.body.password
        }
    }) */
}

module.exports.register =  async function(request, response) {
   
    //Проверяем существует ли пользователь
   const candidate = await User.findOne({
       email: request.body.email
   })

   if (candidate) {
       //Пользователь существует - выдаем ошибку
       response.status(409).json({
           message: 'Такой email уже занят!'
       })
   } else {
       //Нужно создать пользователя

        //генерируем хэш на 10 символов
       const salt =  bcrypt.genSaltSync(10)
      
       const password = request.body.password

       const user = new User({
           email: request.body.email,
           password: bcrypt.hashSync(password, salt)
       })

       try {
            await user.save()
            response.status(201).json(user) 
       } catch(error) {
           //Обрабатываем ошибку
            errorHandler(response, error)           
       }
       
   }

    /*  const user = new User({
        email: request.body.email,
        password: request.body.password
    })
 
    user.save().then(() => {
        console.log('User created')
    })  */
}