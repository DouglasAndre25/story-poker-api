const Sequelize = require('sequelize')
const { participantTypes } = require('../../common/constants')
const { Model } = Sequelize

class participant extends Model {
    static init(sequelize) {
        super.init(
            {
                nickname: Sequelize.STRING,
                type: {
                    type: Sequelize.ENUM,
                    values: participantTypes
                }
            },
            {
                sequelize,
                tableName: 'participant'
            }
        )

        return this
    }

    static associate(models) {
        this.belongsTo(models.user, { foreignKey: 'user_id' })
        this.belongsTo(models.room, { foreignKey: 'room_id' })
        this.belongsToMany(models.roomCard, { through: models.storyParticipant })
        this.belongsToMany(models.story, { through: models.storyParticipant })
        this.hasMany(models.storyParticipant, { foreignKey: 'participant_id' })
    }
}

module.exports = participant
