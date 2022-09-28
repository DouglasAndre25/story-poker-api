const { Router } = require('express')
const errorHandler = require('./app/middlewares/errorHandler')
const auth = require('./app/middlewares/auth')
const { publicRoutes } = require('./common/routes')

const routes = new Router()

const createRoute = (route) => {
    switch(route.method) {
    case 'GET':
        routes.get(route.route, route.query)
        break
    case 'POST':
        routes.post(route.route, route.query)
        break
    case 'PUT':
        routes.put(route.route, route.query)
        break
    case 'DELETE':
        routes.delete(route.route, route.query)
        break
    }
}

publicRoutes.forEach(route => {
    createRoute(route)
})

routes.use(auth)

routes.get('/', (req, res) => {
    return res.send({ ok: true })
})

routes.use(errorHandler)

module.exports = routes
