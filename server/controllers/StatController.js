const statController = require('express').Router()

statController.get('/ping', async (req, res) => {
    res.status(204).end()
})

module.exports = statController