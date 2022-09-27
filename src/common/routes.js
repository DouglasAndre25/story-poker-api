const UserController = require('../app/controllers/user')

module.exports = {
    publicRoutes: [
        {
            route: '/user',
            method: 'POST',
            query: UserController.create
        }
    ]
}
