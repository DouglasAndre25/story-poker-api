const { roomTypes } = require('../../config/common/constants')

module.exports = {
    async up (queryInterface, Sequelize) {
        return queryInterface.createTable('card', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            value: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            type: {
                type: Sequelize.ENUM,
                values: roomTypes,
                allowNull: false
            }
        })
    },

    async down (queryInterface) {
        return queryInterface.dropTable('card')
    }
}
