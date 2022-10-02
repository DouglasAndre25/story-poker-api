const { storyValidation } = require('../../common/validations')
const story = require('../models/story')

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

module.exports = {
    create
}
