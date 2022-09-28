const card = require('../models/card')

const getAll = async (req, res, next) => {
    try {
        const cards = await card.findAll()

        const cardResponse = {
            cards: [],
            fibonacci: [],
            relative: [],
            sequential: []
        }

        for(const item of cards) {
            cardResponse[item.type].push(item)
        }

        return res.send({
            data: cardResponse
        })

    } catch (error) {
        return next(error)
    }
}

module.exports = {
    getAll
}
