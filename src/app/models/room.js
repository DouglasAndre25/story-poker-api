const Sequelize = require('sequelize')
const { roomTypes } = require('../../common/constants')
const { Model } = Sequelize
const { v4: uuidV4 } = require('uuid')

class room extends Model {
    static init(sequelize) {
        super.init(
            {
                name: Sequelize.STRING,
                type: roomTypes
            },
            {
                sequelize,
                tableName: 'room'
            }
        )

        this.addHook('beforeCreate', (room) => {
            room.id = uuidV4()
        })

        return this
    }

    static associate(models) {
        this.hasMany(models.participant, { foreignKey: 'room_id', as: 'room'})
        this.hasMany(models.story, { foreignKey: 'room_id', as: 'story' })
        this.belongsToMany(models.card, { through: models.roomCard })
        this.hasMany(models.roomCard, { foreignKey: 'room_id', as: 'card' })
    }
}

module.exports = room
