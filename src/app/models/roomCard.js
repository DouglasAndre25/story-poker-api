const Sequelize = require('sequelize')
const { Model } = Sequelize

class roomCard extends Model {
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
            tableName: 'room_card',
        })

        return this
    }

    static associate(models) {
        this.belongsTo(models.card, { foreignKey: 'card_id' })
        this.belongsTo(models.room, { foreignKey: 'room_id' })
        this.belongsToMany(models.participant, { through: models.storyParticipant, onDelete: 'cascade', onUpdate: 'cascade', hook: true })
        this.belongsToMany(models.story, { through: models.storyParticipant, onDelete: 'cascade', onUpdate: 'cascade', hook: true })
        this.hasMany(models.storyParticipant, { foreignKey: 'room_card_id', onDelete: 'cascade', onUpdate: 'cascade', hook: true })
    }
}

module.exports = roomCard
