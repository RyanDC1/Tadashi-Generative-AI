const middleware = (request, response, next) => {
    if(!(process.env.ALLOWED_ORIGINS.includes(request.headers.origin)))
    {
        return response.status(401).json({ error: 'Unauthorized' }).end()
    }

    next()
}

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'Unknown Endpoint' })
    console.error(`Request to ${request.path} responded in 404`)
}

const errorhandler = (error, request, response) => {
    console.error(error.message)
    return response.status(500).json({ error: 'Server could not process the request', message: error.message })
}

module.exports = {
    middleware,
    unknownEndpoint,
    errorhandler
}