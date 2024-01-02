const { Crypt } = require('hybrid-crypto-js')

const middleware = (request, response, next) => {
    if(!(process.env.ALLOWED_ORIGINS.includes(request.headers.origin)) && request.url !== '/api/v1/ping')
    {
        return response.status(401).json({ error: 'Unauthorized' }).end()
    }

    if(JSON.parse(process.env.PRODUCTION_MODE ?? 'true') === true)
    {
        const entropy = process.env.VITE_RSA_ENTROPHY;
        const crypt = new Crypt({
            rsaStandard: 'RSA-OAEP',
            entropy: entropy
        });
        const decrypted = crypt.decrypt(process.env.SERVER_SECRET, JSON.stringify(request.body))
        request.body = JSON.parse(decrypted.message)
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