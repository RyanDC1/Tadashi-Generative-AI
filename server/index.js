const PORT = 5000
require('dotenv').config()

const express = require('express')
const cors = require('cors')
const { GENERATIVE_LANGUAGE_URL } = require('./constants')

const app = express()

app.use(express.json())
app.use(cors())

app.post('/api/v1/prompt', async (req, res) => {

    const { prompt, temperature = 0.1, candidate_count = 1, messages = [] } = req.body

    const payload = {
        prompt: {
            messages: [
                {
                    content: prompt
                }
            ]
        },
        temperature, // response creativity
        candidate_count, // number of matches,
        // messages
    }

    const response = await fetch(GENERATIVE_LANGUAGE_URL, {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(payload)
    })

    const data = await response.json()
    res.send(data)
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})