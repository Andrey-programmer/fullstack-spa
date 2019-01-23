// Базовая конфигурация файлов
const multer = require('multer')
const moment = require('moment')

const storage = multer.diskStorage({
    destination(request, file, callback) {
        callback(null, 'files/') //где 1й параметр - ошибка, 2й параметр - папка загрузки файла (которую необходимо заранее создать)
    },
    filename(request, file, callback) {
        //формируем формат времени через moment.js
        const date = moment().format('DDMMYYYY-HHmmss_SSS')
        callback(null, `${date}-${file.originalname}`) //где 1й параметр - ошибка, 2q параметр - имя файла
    }
})

// Проверяем что тип файла - картинка
const fileFilter = (request, file, callback) => {
    if(file.mimetype === 'image/png' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg') {
        callback(null, true) //пропускаем файл
    } else {
        callback(null, false)//не пропускаем файл
    }
}

//Лимитируем размер подгружаемых картинок
const limits = {
    fileSize: 1024 * 1024 * 5
}

module.exports = multer({
    storage,
    fileFilter,
    limits
})