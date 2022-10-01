const Sequelize = require('sequelize')
const { roomTypes } = require('../../common/constants')
const { Model } = Sequelize

class card extends Model {
    static init(sequelize) {
        super.init({
            value: Sequelize.STRING,
            type: {
                type: Sequelize.ENUM,
                values: roomTypes
            }
        },
        {
            sequelize,
            tableName: 'card',
        })

        return this
    }

    static associate(models) {
        this.belongsToMany(models.room, { through: models.roomCard, onDelete: 'cascade', onUpdate: 'cascade', hook: true })
        this.hasMany(models.roomCard, { foreignKey: 'card_id', onDelete: 'cascade', onUpdate: 'cascade', hook: true })
    }
}

module.exports = card
