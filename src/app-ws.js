require('dotenv/config')
const WebSocket = require('ws')
const { promisify } = require('util')
const jwt = require('jsonwebtoken')

const onError = (ws, err) => {
    console.error(`onError: ${err.message}`)
}

const onMessage = (ws, data) => {
    console.log(`onMessage: ${data}`)
    ws.send('recebido!')
}

const onConnection = (ws, req) => {
    ws.on('message', data => onMessage(ws, data))
    ws.on('error', error => onError(ws, error))
    console.log('onConnection')
}

const verifyClient = async (info, callback) => {
    const token = info.req.url.split('token=')[1]

    if(!token)
        return callback(false)

    const decoded = await promisify(jwt.verify)(token, process.env.APP_SECRET)

    if(decoded)
        return callback(true)

    return callback(false)
}

function broadcast(jsonObject) {
    if (!this.clients) return
    this.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(jsonObject))
        }
    })
}

module.exports = (server) => {
    const wss = new WebSocket.Server({
        server,
        // verifyClient
    })

    wss.on('connection', onConnection)
    wss.broadcast = broadcast

    console.log('App Web Socket Server is running!')
    return wss
}
