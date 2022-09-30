const { participantValidation } = require('../../common/validations')
const participant = require('../models/participant')
const jwt = require('jsonwebtoken')

const create = async (req, res, next) => {
    try {
        const { body } = req
        await participantValidation.validate(body)

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
            .sign(
                {
                    id: body.user_id,
                    participant_id: participantResponse.id,
                    type: body.user_id ? 'account' : 'guest',
                }, process.env.APP_SECRET, {
                    expiresIn: process.env.APP_SECRET_EXPIRES,
                })

        return res.status(201).send({
            data: {
                participant: participantResponse,
                token
            }
        })
    } catch (error) {
        console.log(error)
        return next(error)
    }
}

module.exports = {
    create
}
