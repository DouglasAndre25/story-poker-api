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
                tableName: 'user',
            }
        )

        this.addHook('beforeSave', async (people) => {
            if (people.password) {
                people.password = await bcrypt.hash(people.password, 8)
            }
        })

        this.addHook('beforeUpdate', async (people) => {
            if (people.password) {
                people.password = await bcrypt.hash(people.password, 8)
            }
        })

        return this
    }

    static associate(models) {
        this.hasMany(models.participant, { foreignKey: 'user_id', onDelete: 'cascade', onUpdate: 'cascade', hook: true })
        this.hasMany(models.room, { foreignKey: 'owner_id', onDelete: 'cascade', onUpdate: 'cascade', hook: true })
    }
}

module.exports = user
