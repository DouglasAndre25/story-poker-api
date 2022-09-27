const Sequelize = require('sequelize')
const user = require('./user')
const participant = require('./participant')
const room = require('./room')
const story = require('./story')
const card = require('./card')
const roomCard = require('./roomCard')
const storyParticipant = require('./storyParticipant')

const databaseConfig = require('../../config/database')[
    process.env.NODE_ENV || 'development'
]

const models = [user, participant, room, story, card, roomCard, storyParticipant]

class Database {
    constructor() {
        this.init()
    }

    init() {
        this.connection = new Sequelize(databaseConfig)
        models
            .map((model) => model.init(this.connection))
            .map((model) => {
                return model.associate && model.associate(this.connection.models)
            })
    }
}

module.exports = new Database()
