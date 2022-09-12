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
                values: ['fibonacci', 'relative', 'sequential', 'cards'],
                allowNull: false
            }
        })
    },

    async down (queryInterface) {
        return queryInterface.dropTable('card')
    }
}
