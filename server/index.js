const express = require('express')
const { MongoClient, ServerApiVersion } = require('mongodb')
const cors = require('cors')
const formidable = require('express-formidable')
const fs = require('fs')
const path = require('path')
const app = express()
const port = 3001

app.use(cors())
app.use(express.json({ limit: '10mb' }))

app.use(
    formidable({
        uploadDir: __dirname + '/tmp', // don't forget the __dirname here
        keepExtensions: true,
    })
)

// Подключение к базе данных
const url = 'mongodb://localhost:27017'
const dbName = 'interactive-map'

const client = new MongoClient(url, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
})

// Выполняем подключение к базе данных
client
    .connect()
    .then(() => {
        console.log('Подключение к базе данных успешно!')
    })
    .catch((err) => {
        console.error('Ошибка при подключении к базе данных:', err)
    })

// Добавляем обработчики событий
client.on('connected', () => {
    console.log('Успешно подключено к серверу MongoDB!')
})

client.on('disconnected', () => {
    console.log('Отключено от сервера MongoDB!')
})

client.on('error', (err) => {
    console.error('Ошибка подключения к MongoDB:', err)
})

// Выбор базы данных
const db = client.db(dbName)

// Получение маркеров
app.get('/markers/*', async (req, res) => {
    const refererPath = req.params[0] || ''
    const collectionName = refererPath
    try {
        // Поиск всех документов в коллекции
        await client.connect()

        const results = await db.collection(collectionName).find({}).toArray()

        res.json(results)
    } catch (error) {
        console.error('Ошибка при обработке запроса: ' + error.stack)
        res.status(500).json({
            success: false,
            message: 'Ошибка сервера',
        })
    }
})

// Добавление нового маркера
app.post('/markers', async (req, res) => {
    const collectionName = req.fields.location

    try {
        await client.connect()

        const id = req.fields.id
        const name = req.fields.name
        const icon = req.fields.icon
        const description = req.fields.description
        const img = JSON.parse(req.fields.img)
        const position = JSON.parse(req.fields.position)
        const color = req.fields.color

        //Загрузка файлов
        for (const [key, value] of Object.entries(req.files)) {
            const oldpath = value.path
            const uploadFolder = path.join(
                __dirname,
                '..',
                'public',
                'images',
                value.name
            )

            fs.access(uploadFolder, fs.constants.F_OK, (err) => {
                if (err) {
                    fs.rename(oldpath, uploadFolder, (err) => {
                        if (err) throw err
                    })
                } else {
                    return
                }
            })
        }

        // Добавление нового маркера в коллекцию
        await db.collection(collectionName).insertOne({
            id,
            name,
            icon,
            description,
            position,
            img,
            color,
        })

        const newMarker = {
            id,
            name,
            icon,
            description,
            position: position,
            img: img,
            color,
        }

        res.status(201).json({
            success: true,
            message: 'Маркер успешно добавлен.',
            newMarker,
        })
    } catch (error) {
        console.error('Ошибка при обработке запроса: ' + error.stack)
        res.status(500).json({
            success: false,
            message: 'Ошибка сервера',
        })
    }
})

// Обновление маркера
app.put('/markers', async (req, res) => {
    const { id, name, description, location } = req.fields
    const img = JSON.parse(req.fields.img)
    console.log(req.files)

    try {
        const filter = { id: id }
        const update = {
            $set: {
                name,
                description,
                img,
            },
        }
        const options = { returnDocument: true }
        // Загрузка файлов
        for (const [key, value] of Object.entries(req.files)) {
            const oldpath = value.path
            const uploadFolder = path.join(
                __dirname,
                '..',
                'public',
                'images',
                value.name
            )

            fs.access(uploadFolder, fs.constants.F_OK, (err) => {
                if (err) {
                    fs.rename(oldpath, uploadFolder, (err) => {
                        if (err) throw err
                    })
                } else {
                    return
                }
            })
        }
        // Запрос в БД
        const updatedMarker = await db
            .collection(location)
            .findOneAndUpdate(filter, update, options)

        res.status(201).json({
            success: true,
            message: 'Маркер успешно добавлен.',
            marker: updatedMarker,
        })
    } catch (error) {
        console.error('Error processing request:', error)
        res.status(500).json({ success: false, message: 'Ошибка сервера' })
    }
})

// Удаление маркера
app.delete('/markers/:id/:location', async (req, res) => {
    try {
        const { id, location } = req.params

        if (!id) {
            return res.status(400).json({
                success: false,
                message: 'Отсутствует идентификатор маркера (id).',
            })
        }

        // Удаление маркера по id
        await db.collection(location).deleteOne({ id: id })

        res.status(200).json({
            success: true,
            message: 'Маркер успешно удален.',
            id,
        })
    } catch (error) {
        console.error('Ошибка при удалении маркера:', error)
        res.status(500).json({ success: false, message: 'Ошибка сервера' })
    }
})

app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`)
})
