const { roomTypes } = require('../../common/constants')

module.exports = {
    async up (queryInterface, Sequelize) {
        return queryInterface.createTable('room', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.STRING,
            },
            name: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            type: {
                type: Sequelize.ENUM,
                values: roomTypes,
                allowNull: false
            },
            owner_id: {
                type: Sequelize.INTEGER,
                reference: { model: 'participant', key: 'id' },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
                allowNull: false,
            }
        })
    },

    async down (queryInterface) {
        return queryInterface.dropTable('room')
    }
}
