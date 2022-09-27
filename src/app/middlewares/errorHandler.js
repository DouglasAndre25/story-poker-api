module.exports = (error, req, res, next) => {
    console.log(error)
    if(error.name === 'ValidationError') {
        return res.status(400)
            .send({ error: {
                message: error.errors.join(','),
                field: error.path,
            }})
    } else if (error) {
        return res.status(500).send(error)
    }

    return next()
}
