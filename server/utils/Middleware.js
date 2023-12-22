const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'Unknown Endpoint' })
    console.error(`Request to ${request.path} responded in 404`)
}

const errorhandler = (error, request, response) => {
    console.error(error.message)
    return response.status(500).json({ error: 'Server could not process the request', message: error.message })
}

module.exports = {
    unknownEndpoint,
    errorhandler
}