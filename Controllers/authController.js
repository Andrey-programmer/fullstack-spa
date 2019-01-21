const bycrpt = require('bcryptjs')

const User = require('../models/User')

module.exports.login = function(request, response) {
    response.status(200).json({
        login: {
            email: request.body.email ,
            password: request.body.password
        }
    })
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
       const salt =  bycrpt.genSaltSync(10)
      
       const password = request.body.password

       const user = new User({
           email: request.body.email,
           password: bycrpt.hashSync(password, salt)
       })

       try {
            await user.save()
            response.status(201).json(user) 
       } catch(error) {
           //Обрабатываем ошибку
           
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