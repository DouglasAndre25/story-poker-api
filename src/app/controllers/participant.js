const { participantValidation } = require('../../common/validations')
const participant = require('../models/participant')
const jwt = require('jsonwebtoken')

const create = async (req, res, next) => {
    try {
        const { body } = req
        await participantValidation(body)

        const participantResponse = await participant.create({
            nickname: body.nickname,
            type: body.type,
            user_id: body.user_id,
            room_id: body.room_id
        })

        if(body.user_id) {
            return res.status(201).send({
                data: {
                    participant: participantResponse
                }
            })
        }

        const token = jwt
            .sign({ id: participantResponse.id, type: 'guest' }, process.env.APP_SECRET, {
                expiresIn: process.env.APP_SECRET_EXPIRES,
            })

        return res.status(201).send({
            data: {
                participant: participantResponse,
                token
            }
        })
    } catch (error) {
        return next(error)
    }
}

module.exports = {
    create
}
