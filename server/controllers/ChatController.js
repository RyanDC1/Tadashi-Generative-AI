const chatController = require('express').Router()
const { GENERATIVE_LANGUAGE_CHAT_URL, PRE_PROMPT_CONTEXT } = require('../constants')

chatController.post('/prompt', async (req, res) => {

    console.log(req.ip, req.ips, req.socket.remoteAddress, req.headers['x-forwarded-for'], req.headers['x-real-ip'])
    const { prompt, temperature = 0.5, history = [] } = req.body

    const payload = {
        contents: [
            ...PRE_PROMPT_CONTEXT,
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