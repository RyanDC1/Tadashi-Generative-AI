const PORT = 5000
require('dotenv').config()

const express = require('express')
const cors = require('cors')

const ChatController = require('./controllers/ChatController')
const StatController = require('./controllers/StatController')
const { unknownEndpoint, errorhandler, middleware } = require('./utils/Middleware')
const API_V1 = '/api/v1'

const app = express()

app.use(express.static('dist'))
app.use(cors())
app.use(express.json({ limit: '10mb' }))

app.use(middleware)

app.use(API_V1, ChatController)
app.use(API_V1, StatController)
app.use(unknownEndpoint)
app.use(errorhandler)


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})