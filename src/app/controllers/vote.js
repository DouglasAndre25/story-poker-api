const storyParticipant = require('../models/storyParticipant')

const createOrUpdate = async (req, res, next) => {
    const { body } = req
    if(body.id)
        return await update(req, res, next)
    else
        return await create(req, res, next)
}

const create = async (req, res, next) => {
    try {
        const { body, user } = req

        const voteResponse = await storyParticipant.create({
            participant_id: user.participant_id,
            story_id: body.story_id,
            room_card_id: body.room_card_id
        })

        return res.status(201).send({ data: voteResponse })
    } catch (error) {
        return next(error)
    }
}

const update = async (req, res, next) => {
    try {
        const { body } = req

        const [, voteResponse] = await storyParticipant.update({
            room_card_id: body.room_card_id
        }, {
            where: {
                id: body.id
            },
            returning: true,
        })

        return res.send({
            data: voteResponse[0]
        })
    } catch (error) {
        return next(error)
    }
}

module.exports = {
    createOrUpdate
}
