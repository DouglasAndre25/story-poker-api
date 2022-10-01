const Sequelize = require('sequelize')
const { statusTypes } = require('../../common/constants')
const { Model } = Sequelize

class story extends Model {
    static init(sequelize) {
        super.init({
            title: Sequelize.STRING,
            estimation: Sequelize.STRING,
            duration_time: Sequelize.DATE,
            status: {
                type: Sequelize.ENUM,
                values: statusTypes,
                defaultValue: 'queue'
            }
        },
        {
            sequelize,
            tableName: 'story',
        })

        return this
    }

    static associate(models) {
        this.belongsTo(models.room, { foreignKey: 'room_id' })
        this.belongsToMany(models.roomCard, { through: models.storyParticipant, onDelete: 'cascade', onUpdate: 'cascade', hook: true })
        this.belongsToMany(models.participant, { through: models.storyParticipant, onDelete: 'cascade', onUpdate: 'cascade', hook: true })
        this.hasMany(models.storyParticipant, { foreignKey: 'story_id', onDelete: 'cascade', onUpdate: 'cascade', hook: true })
    }
}

module.exports = story
