const Sequelize = require('sequelize')
const { Model } = Sequelize

class storyParticipant extends Model {
    static init(sequelize) {
        super.init({
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            }
        },
        {
            sequelize,
            tableName: 'story_participant'
        })

        return this
    }

    static associate(models) {
        this.belongsTo(models.participant, { foreignKey: 'participant_id'})
        this.belongsTo(models.story, { foreignKey: 'story_id'})
        this.belongsTo(models.roomCard, { foreignKey: 'room_card_id'})
    }
}

module.exports = storyParticipant
