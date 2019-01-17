const app = require('./app')

// Задаём порт через консоль, если не задано то используем порт 5000
const port = process.env.PORT || 5000

app.listen(port, () => {
    console.log(`Server has been started, port ${port}`)
})