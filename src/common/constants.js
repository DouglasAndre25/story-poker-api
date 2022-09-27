const participantTypes = [
    'observer',
    'player'
]

const roomTypes = [
    'fibonacci',
    'relative',
    'sequential',
    'cards',
]

const statusTypes = [
    'queue',
    'active',
    'completed',
]

const fibonacciCardValues = [
    '0', '1', '2', '3', '5', '8',
    '13', '21', '34', '55', '89', '?',
]

const relativeCardValues = [
    'bee', 'hamster', 'rabbit', 'cat',
    'wolf', 'lion', 'bear', 'giraffe', 'whale', '?'
]

const sequentialCardValues = [
    '0', '1', '2', '3', '4', '5', '6',
    '7', '8', '9', '10', '?'
]

const cardsCardValues = [
    'ace', '2', '3', '5', '8', 'king', '?'
]

module.exports = {
    participantTypes,
    roomTypes,
    statusTypes,
    fibonacciCardValues,
    relativeCardValues,
    sequentialCardValues,
    cardsCardValues
}
