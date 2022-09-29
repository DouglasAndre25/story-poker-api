const Sequelize = require('sequelize')
const { Model } = Sequelize
const bcrypt = require('bcryptjs')

class user extends Model {
    static init(sequelize) {
        super.init(
            {
                name: Sequelize.STRING,
                email: Sequelize.STRING,
                password: Sequelize.STRING
            },
            {
                sequelize,
                tableName: 'user'
            }
        )

        this.addHook('beforeSave', async (people) => {
            if (people.password) {
                people.password = await bcrypt.hash(people.password, 8)
            }
        })

        return this
    }

    static associate(models) {
        this.hasMany(models.participant, { foreignKey: 'user_id', as: 'user'})
        this.hasMany(models.room, { foreignKey: 'owner_id', as: 'owner' })
    }
}

module.exports = user
