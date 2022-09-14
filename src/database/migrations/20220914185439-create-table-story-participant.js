module.exports = {
    async up (queryInterface, Sequelize) {
        return queryInterface.createTable('story_participant', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            participant_id: {
                type: Sequelize.INTEGER,
                reference: { model: 'participant', key: 'id' },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
                allowNull: false,
            },
            story_id: {
                type: Sequelize.INTEGER,
                reference: { model: 'story', key: 'id' },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
                allowNull: false,
            },
            room_card_id: {
                type: Sequelize.INTEGER,
                reference: { model: 'room_card', key: 'id' },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
                allowNull: false,
            }
        })
    },

    async down (queryInterface) {
        return queryInterface.dropTable('story_participant')
    }
}
