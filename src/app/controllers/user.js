const messages = require('../../common/messages')
const { userValidation } = require('../../common/validations')
const user = require('../models/user')
const jwt = require('jsonwebtoken')

const create = async (req, res, next) => {
    try {
        const { body } = req
        await userValidation.validate(body)

        const userExists = await user.findOne({
            where: { email: body.email }
        })

        if(userExists) {
            return next({
                errors: [
                    messages.user.errors.userAlreadyExists
                ],
                path: 'email',
                name: 'ValidationError'
            })
        }

        const userResponse = await user.create({
            name: body.name,
            email: body.email,
            password: body.password
        })

        const token = jwt.sign({ id: userResponse.id }, process.env.APP_SECRET, {
            expiresIn: process.env.APP_SECRET_EXPIRES,
        })

        return res.status(201).send({ data: { user: {
            id: userResponse.id,
            name: userResponse.name,
            email: userResponse.email
        }, token }})
    } catch (error) {
        next(error)
    }
}

module.exports = {
    create
}
