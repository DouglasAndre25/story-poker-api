const userControler = require('../app/controllers/user')
const participantController = require('../app/controllers/participant')
const cardController = require('../app/controllers/card')
const roomController = require('../app/controllers/room')
const storyController = require('../app/controllers/story')
const voteController = require('../app/controllers/vote')

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
        },
        {
            route: '/room',
            method: 'POST',
            query: roomController.create,
        },
        {
            route: '/room',
            method: 'GET',
            query: roomController.getAll,
        },
        {
            route: '/room/:id',
            method: 'PUT',
            query: roomController.update,
        },
        {
            route: '/room/:id',
            method: 'DELETE',
            query: roomController.exclude,
        },
        {
            route: '/room/:id',
            method: 'GET',
            query: roomController.getById,
        },
        {
            route: '/participant/:id',
            method: 'DELETE',
            query: participantController.exclude,
        },
        {
            route: '/participant/:id',
            method: 'GET',
            query: participantController.getAll
        },
        {
            route: '/user/:id',
            method: 'PUT',
            query: userControler.update
        },
        {
            route: '/user/:id',
            method: 'DELETE',
            query: userControler.exclude
        },
        {
            route: '/story/',
            method: 'POST',
            query: storyController.create
        },
        {
            route: '/story/:id',
            method: 'GET',
            query: storyController.getAll
        },
        {
            route: '/story/:id',
            method: 'PUT',
            query: storyController.update
        },
        {
            route: '/story/:id',
            method: 'DELETE',
            query: storyController.exclude
        },
        {
            route: '/vote',
            method: 'POST',
            query: voteController.createOrUpdate
        }
    ]
}
