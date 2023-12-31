const chatController = require('express').Router()
const { GENERATIVE_LANGUAGE_CHAT_URL, PRE_PROMPT_CONTEXT } = require('../constants')

chatController.post('/prompt', async (req, res) => {

    const { prompt, temperature = 0.5, history = [] } = req.body

    if(history.length > 10)
    {
        let insertIndex = history.length - 10
        if(insertIndex % 2 === 1)
        {
            // ensure proper flow of actors is followed
            // user prompt should be followed by response
            insertIndex -= insertIndex
        }
        history.splice(insertIndex, 0, ...(PRE_PROMPT_CONTEXT ?? []))
    }
    else {
        history.splice(0, 0, ...(PRE_PROMPT_CONTEXT ?? []))
    }
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