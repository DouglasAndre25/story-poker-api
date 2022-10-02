const { storyValidation, storyUpdateValidation } = require('../../common/validations')
const card = require('../models/card')
const participant = require('../models/participant')
const roomCard = require('../models/roomCard')
const story = require('../models/story')
const storyParticipant = require('../models/storyParticipant')

const create = async (req, res, next) => {
    try {
        const { body } = req
        await storyValidation.validate(body)

        const storyResponse = await story.create({
            title: body.title,
            room_id: body.room_id,
            status: 'queue',
        })

        return res.status(201).send({
            data: storyResponse
        })
    } catch (error) {
        return next(error)
    }
}

const getAll = async (req, res, next) => {
    try {
        const { params } = req

        const storyResponse = await story.findAll({
            where: {
                room_id: params.id
            },
            include: {
                model: storyParticipant,
                attributes: ['id'],
                include: [
                    {
                        model: participant
                    },
                    {
                        model: roomCard,
                        attributes: ['id'],
                        include: {
                            model: card
                        }
                    }
                ]
            }
        })

        return res.send({
            data: {
                queue: storyResponse.filter(story => story.status === 'queue'),
                completed: storyResponse.filter(story => story.status !== 'queue')
            }
        })
    } catch (error) {
        return next(error)
    }
}

const update = async (req, res, next) => {
    try {
        const { params, body } = req
        await storyUpdateValidation.validate(body)

        const [, storyResponse] = await story.update({
            title: body.title,
            estimation: body.estimation,
            status: body.status,
        },
        {
            where: {
                id: params.id
            },
            returning: true
        })

        return res.send({
            data: storyResponse[0]
        })
    } catch (error) {
        return next(error)
    }
}

module.exports = {
    create,
    getAll,
    update
}
