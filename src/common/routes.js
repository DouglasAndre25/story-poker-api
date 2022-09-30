const userControler = require('../app/controllers/user')
const participantController = require('../app/controllers/participant')
const cardController = require('../app/controllers/card')
const roomController = require('../app/controllers/room')

module.exports = {
    publicRoutes: [
        {
            route: '/user',
            method: 'POST',
            query: userControler.create
        },
        {
            route: '/login',
            method: 'POST',
            query: userControler.login
        },
        {
            route: '/participant',
            method: 'POST',
            query: participantController.create
        }
    ],
    privateRoutes: [
        {
            route: '/cards',
            method: 'GET',
            query: cardController.getAll,
            allow: ['account']
        },
        {
            route: '/room',
            method: 'POST',
            query: roomController.create,
            allow: ['account']
        },
        {
            route: '/room',
            method: 'GET',
            query: roomController.getAll,
            allow: ['account']
        },
        {
            route: '/room/:id',
            method: 'PUT',
            query: roomController.update,
            allow: ['account']
        },
        {
            route: '/room/:id',
            method: 'DELETE',
            query: roomController.exclude,
            allow: ['account']
        }
    ]
}
