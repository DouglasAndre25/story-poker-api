const { participantTypes } = require('../../common/constants')

module.exports = {
    async up (queryInterface, Sequelize) {
        return queryInterface.createTable('participant', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            nickname: {
                allowNull: false,
                type: Sequelize.STRING
            },
            type: {
                type: Sequelize.ENUM,
                values: participantTypes,
                allowNull: false
            },
            user_id: {
                type: Sequelize.INTEGER,
                reference: { model: 'user', key: 'id' },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
                allowNull: true,
            },
            room_id: {
                type: Sequelize.INTEGER,
                reference: { model: 'room', key: 'id' },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
                allowNull: false,
            }
        })
    },

    async down (queryInterface) {
        return queryInterface.dropTable('participant')
    }

}
