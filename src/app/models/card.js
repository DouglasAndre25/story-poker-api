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
            tableName: 'card'
        })

        return this
    }

    static associate(models) {
        this.belongsToMany(models.room, { through: models.roomCard })
        this.hasMany(models.roomCard, { foreignKey: 'card_id' })
    }
}

module.exports = card
