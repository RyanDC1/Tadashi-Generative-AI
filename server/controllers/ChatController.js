const chatController = require('express').Router()
const { GENERATIVE_LANGUAGE_CHAT_URL, PRE_PROMPT_CONTEXT } = require('../constants')

chatController.post('/prompt', async (req, res) => {

    const { prompt, temperature = 0.5, history = [] } = req.body
    console.log(req.headers)
    if(!(process.env.ALLOWED_PROTOCOLS.includes(req.headers['x-forwarded-for'])) || !(process.env.ALLOWED_HOSTS.includes(req.headers.host)))
    {
        return res.status(401).json({ error: 'Unauthorized' }).end()
    }

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