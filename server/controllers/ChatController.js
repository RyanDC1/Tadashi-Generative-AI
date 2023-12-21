const chatController = require('express').Router()
const { GENERATIVE_LANGUAGE_CHAT_URL } = require('../constants')

chatController.post('/prompt', async (req, res) => {

    const { prompt, temperature = 0.5, history = [] } = req.body

    const payload = {
        contents: [
            ...history,
            {
                role: 'user',
                parts: [
                    {
                        text: prompt
                    }
                ]
            }
        ],
        generationConfig: {
            temperature
        }
    }

    const response = await fetch(GENERATIVE_LANGUAGE_CHAT_URL, {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(payload)
    })

    const data = await response.json()
    res.send(data)
})


module.exports = chatController