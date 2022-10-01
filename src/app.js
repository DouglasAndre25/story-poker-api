const express = require('express')
const http = require('http')
const socketIo = require('socket.io')
const cors = require('cors')
const routes = require('./routes')

class App {
    constructor() {
        this.app = express()
        this.server = http.createServer(this.app)

        this.socket()
        this.middlewares()
        this.routes()

    }

    socket() {
        this.io = socketIo(this.server)
        this.io.on('connection', socket => {
            console.log(`${socket.id} connected!`)
        })

        this.io.on('sendMessage', data => {
            console.log(data)
        })
    }

    middlewares() {
        this.app.use(cors())
        this.app.use(express.json())

        this.app.use((req, res, next) => {
            req.io = this.io
            req.connectedUsers = this.connectedUsers

            next()
        })
    }

    routes() {
        this.app.use(routes)
    }
}

module.exports = new App().server

// require('dotenv/config')

// const express = require('express')
// const cors = require('cors')
// const routes = require('./routes')

// require('./app/models')

// const app = express()
// const server = require('http').createServer(app)
// const io = require('socket.io')(server)

// app.use(cors())
// app.use(express.json())
// app.use(routes)

// require('./socket')(io)

// module.exports = server
