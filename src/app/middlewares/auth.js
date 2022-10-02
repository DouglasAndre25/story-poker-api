const jwt = require('jsonwebtoken')
const { promisify } = require('util')

module.exports = async (req, res, next) => {
    const authHeader = req.headers.authorization

    if(!authHeader)
        return next({
            message: 'authentication.errors.tokenNotProvided',
            status: 401
        })

    const [, token] = authHeader.split(' ')

    try {
        const decoded = await promisify(jwt.verify)(token, process.env.APP_SECRET)

        req.user = {
            id: decoded.id,
            type: decoded.type,
            participant_id: decoded.participant_id
        }

        return next()
    } catch (error) {
        return next({
            message: 'authentication.errors.invalidToken',
            status: 401
        })
    }
}
