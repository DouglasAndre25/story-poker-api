module.exports = {
    async up (queryInterface, Sequelize) {
        return queryInterface.createTable('room_card', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            room_id: {
                type: Sequelize.INTEGER,
                reference: { model: 'room', key: 'id' },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
                allowNull: false,
            },
            card_id: {
                type: Sequelize.INTEGER,
                reference: { model: 'card', key: 'id' },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
                allowNull: false,
            }
        })
    },

    async down (queryInterface) {
        return queryInterface.dropTable('room_card')
    }
}
