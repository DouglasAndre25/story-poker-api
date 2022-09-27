const messages = require('../../common/messages')

module.exports = (error, req, res, next) => {
    if(error.name === 'ValidationError') {
        return res.status(400)
            .send({ error: {
                message: error.errors.join(','),
                field: error.path,
            }})
    } else if(error.message) {
        const paths = error.message.split('.')
        let message = messages
        paths.forEach(path => {
            message = message[path]
        })
        return res.status(error.status)
            .send({ error: {
                message,
                field: error.path
            }})
    } else if (error) {
        return res.status(500).send(error)
    }

    return next()
}
