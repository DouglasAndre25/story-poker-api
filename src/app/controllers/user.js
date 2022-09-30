const { userValidation, loginValidation, userUpdateValidation } = require('../../common/validations')
const user = require('../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const create = async (req, res, next) => {
    try {
        const { body } = req
        await userValidation.validate(body)

        const userExists = await user.findOne({
            where: { email: body.email }
        })

        if(userExists) {
            return next({
                message: 'user.errors.userAlreadyExists',
                path: 'email',
                status: 400
            })
        }

        const userResponse = await user.create({
            name: body.name,
            email: body.email,
            password: body.password
        })

        const token = jwt
            .sign({ id: userResponse.id, type: 'account' }, process.env.APP_SECRET, {
                expiresIn: process.env.APP_SECRET_EXPIRES,
            })

        return res.status(201).send({ data: { user: {
            id: userResponse.id,
            name: userResponse.name,
            email: userResponse.email
        }, token }})
    } catch (error) {
        return next(error)
    }
}

const login = async (req, res, next) => {
    try {
        const { body } = req
        await loginValidation.validate(body)

        const userResponse = await user.findOne({
            where: { email: body.email }
        })

        if(!userResponse)
            return next({
                message: 'login.errors.accountNotFound',
                path: 'email',
                status: 401
            })

        if(await !bcrypt.compare(body.password, userResponse.password))
            return next({
                message: 'login.errors.passwordNotMatch',
                path: 'password',
                status: 401
            })

        const token = jwt
            .sign({ id: userResponse.id, type: 'account' }, process.env.APP_SECRET, {
                expiresIn: process.env.APP_SECRET_EXPIRES,
            })
        
        return res.send({ data: { user: {
            id: userResponse.id,
            name: userResponse.name,
            email: userResponse.email
        }, token }})
    } catch (error) {
        return next(error)
    }
}

const update = async (req, res, next) => {
    try {
        const { params, body } = req
        await userUpdateValidation.validate(body)

        const userResponse = await user.update({
            name: body.name,
            email: body.email,
            password: body.password
        }, {
            where: {
                id: params.id
            },
            individualHooks: true,
        })

        return res.send({ data: { user: {
            id: userResponse.id,
            name: userResponse.name,
            email: userResponse.email
        }}})
    } catch (error) {
        return next(error)
    }
}

module.exports = {
    create,
    login,
    update
}
