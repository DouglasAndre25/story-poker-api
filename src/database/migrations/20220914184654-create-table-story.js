const { statusTypes } = require('../../common/constants')

module.exports = {
    async up (queryInterface, Sequelize) {
        return queryInterface.createTable('story', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            title: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            estimation: {
                type: Sequelize.STRING,
            },
            duration_time: {
                type: Sequelize.DATE
            },
            status: {
                type: Sequelize.ENUM,
                values: statusTypes,
                allowNull: false
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
        return queryInterface.dropTable('story')
    }
}
