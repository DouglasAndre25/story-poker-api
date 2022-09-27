const {
    cardsCardValues,
    fibonacciCardValues,
    relativeCardValues,
    sequentialCardValues
} = require('../../common/constants')

module.exports = {
    async up (queryInterface) {
        const cardsSeed = cardsCardValues.map(card => ({
            value: card,
            type: 'cards'
        }))
        
        const fibonacciSeed = fibonacciCardValues.map(fibonacci => ({
            value: fibonacci,
            type: 'fibonacci'
        }))

        const relativeSeed = relativeCardValues.map(relative => ({
            value: relative,
            type: 'relative'
        }))

        const sequentialSeed = sequentialCardValues.map(sequential => ({
            value: sequential,
            type: 'sequential'
        }))


        return queryInterface.bulkInsert('card', [
            ...cardsSeed,
            ...fibonacciSeed,
            ...relativeSeed,
            ...sequentialSeed
        ])
    },

    async down (queryInterface) {
        return queryInterface.bulkDelete('card', null, {})
    }
}
