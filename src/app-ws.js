require('dotenv/config')
const WebSocket = require('ws')
const { promisify } = require('util')
const jwt = require('jsonwebtoken')

let connections = {}

async function verifyClient(info, callback) {
    const token = info.req.url.split('token=')[1]

    if(!token)
        return callback(false)

    const decoded = await promisify(jwt.verify)(token, process.env.APP_SECRET)

    if(decoded)
        return callback(true)
    else
        return callback(false)
}

function onConnection(socket, req) {
    // Pega o ID da sala pela URL
    const roomId = req.url.substring(
        req.url.indexOf('/room/') + 6,
        req.url.lastIndexOf('?token=')
    )

    // Guarda a conexão num mapa(a chave do mapa é o ID da sala)
    connections[roomId] = [...(connections[roomId] || []), socket]

    socket.on('message', data => onMessage(data))
    socket.on('error', error => onError(socket, error))
}

function onMessage(data) {
    try {
        const { roomId: receivedRoomId, action } = JSON.parse(data)
    
        if(connections[receivedRoomId]) {
            console.log(`[WEBSOCKET] Broadcasting to room: ${receivedRoomId}`)
        
            // Faz 'broadcast' pra sala, só repassando a ação q recebeu
            connections[receivedRoomId].forEach(connection => {
                if(connection.readyState !== WebSocket.CLOSED)
                    connection.send(JSON.stringify({action}))
            })
        }
    } catch(err) {
        console.log(err)
    }
}

function onError(err) {
    console.error(`onError: ${err.message}`)
}

function checkConnections() {
    console.log('[WEBSOCKET] Checking current connections')
    const checkedConnections = {}

    Object.keys(connections).forEach(roomId => {
        const roomConnections = connections[roomId].filter(connection => (
            connection.readyState !== WebSocket.CLOSED
        ))

        if(roomConnections.length > 0)
            checkedConnections[roomId] = roomConnections
    })

    connections = checkedConnections
}

module.exports = (server) => {
    const wss = new WebSocket.Server({
        server,
        verifyClient
    })

    wss.on('connection', (socket, req) => onConnection(socket, req))

    console.log('App Web Socket Server is running!')

    // Checa as conexões ativas a cada 1 minuto(pra não ficar um objetão)
    setInterval(checkConnections, 60000)

    return wss
}
