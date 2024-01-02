const statController = require('express').Router()

statController.get('/ping', async (req, res) => {
    res.status(200).end()
})

module.exports = statController