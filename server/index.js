const express = require('express')
const mysql = require('mysql')
const cors = require('cors')

const app = express()
const port = 3001
app.use(cors())

// Подключение к базе данных
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'interactive_map',
})

db.connect((err) => {
    if (err) {
        console.error('Ошибка подключения к базе данных: ' + err.stack)
        return
    }
    console.log('Подключено к базе данных с id ' + db.threadId)
})

// Эндпоинт для получения данных
app.get('/markers', (req, res) => {
    const query = 'SELECT * FROM krasnoe_bedstvie'
    db.query(query, (err, results) => {
        if (err) {
            console.error('Ошибка запроса к базе данных: ' + err.stack)
            res.status(500).send('Ошибка сервера')
            return
        }

        const transformedResults = results.map(
            ({ img, position, ...rest }) => ({
                ...rest,
                img: img
                    .replace(/'/g, '')
                    .split(',')
                    .map((item) => item.trim())
                    .filter(Boolean),
                position: position
                    .split(', ')
                    .map((item) => parseInt(item.replace(/'/g, ''), 10)),
            })
        )

        res.json(transformedResults)
    })
})

app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`)
})
