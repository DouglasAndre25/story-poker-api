const { roomValidation } = require('../../common/validations')
const { getPagination, getPagingData } = require('../helpers/pagination')
const { connection } = require('../models')
const card = require('../models/card')
const participant = require('../models/participant')
const room = require('../models/room')
const roomCard = require('../models/roomCard')
const story = require('../models/story')

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
        console.log(error)
        await transaction.rollback()
        return next(error)
    }
}

const getAll = async (req, res, next) => {
    try {
        const { query, user } = req
        const { limit, offset } = getPagination(query.page, query.size)
        
        const rooms = await room.findAll({
            limit,
            offset,
            where: {
                owner_id: Number(user.id)
            },
            include: {
                model: roomCard,
                attributes: ['id'],
                include: {
                    model: card,
                    attributes: ['id', 'value', 'type']
                }
            }
        })

        const count = await room.count({
            where: {
                owner_id: Number(user.id)
            },
        })

        const paginationResponse = getPagingData(count, query.page, query.size)
        return res.send({...paginationResponse, data: rooms})
    } catch (error) {
        return next(error)
    }
}

const update = async (req, res, next) => {
    const transaction = await connection.transaction()
    try {
        const { body, user, params } = req
        await roomValidation.validate({...body, owner_id: Number(user.id) })

        const currentRoom = await room.findOne({
            where: {
                id: params.id,
                owner_id: user.id
            }
        })

        const cardsResponse = await card.findAll({
            where: {
                id: body.cards,
                type: body.type
            }
        })

        await roomCard.destroy({
            where: {
                room_id: currentRoom.id
            },
            transaction
        })

        const roomCards = cardsResponse.map(cards => ({
            room_id: currentRoom.id,
            card_id: cards.id
        }))

        const roomCardResponse = await roomCard
            .bulkCreate(roomCards, {
                transaction,
            })
        
        const roomResponse = await currentRoom.update(
            {
                name: body.name,
                type: body.type,
                owner_id: user.id
            },
            {
                transaction,
            }
        )

        await transaction.commit()
        return res.status(200).send({
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

const exclude = async (req, res, next) => {
    try {
        const { params } = req

        const roomResponse = await room.findOne({
            where: {
                id: params.id
            },
        })

        await roomResponse.destroy()

        return res.sendStatus(204)
    } catch (error) {
        return next(error)
    }
}

const getById = async (req, res, next) => {
    try {
        const { params } = req
        const roomResponse = await room.findOne({
            where: {
                id: params.id
            },
            include: [
                {
                    model: roomCard,
                    attributes: ['id'],
                    include: {
                        model: card,
                        attributes: ['id', 'value', 'type']
                    },
                },
                {
                    model: participant
                },
                {
                    model: story,
                }
            ]
        })
    
        return res.send({ data: roomResponse })
    } catch (error) {
        return next(error)
    }
}

module.exports = {
    create,
    getAll,
    update,
    exclude,
    getById
}
