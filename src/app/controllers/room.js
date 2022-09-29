const { roomValidation } = require('../../common/validations')
const { connection } = require('../models')
const card = require('../models/card')
const room = require('../models/room')
const roomCard = require('../models/roomCard')

const create = async (req, res, next) => {
    const transaction = await connection.transaction()
    try {
        const { body, user } = req
        await roomValidation.validate({...body, owner_id: Number(user.id) })

        const roomResponse = await room.create({
            name: body.name,
            type: body.type,
            owner_id: user.id
        },
        { transaction })

        const cardsResponse = await card.findAll({
            where: {
                id: body.cards,
                type: body.type
            }
        })
        
        const roomCards = cardsResponse.map(cards => ({
            room_id: roomResponse.id,
            card_id: cards.id
        }))

        const roomCardResponse = await roomCard
            .bulkCreate(roomCards, {
                transaction,
            })
        await transaction.commit()
        
        return res.status(201).send({
            data: {
                room: { ...roomResponse.dataValues, cards: cardsResponse },
                roomCard: roomCardResponse
            }
        })
    } catch (error) {
        await transaction.rollback()
        return next(error)
    }
}

module.exports = {
    create
}
