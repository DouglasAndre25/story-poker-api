const app = require('./app')
const appWs = require('./app-ws')
const port = process.env.PORT || 8080

const server = app.listen(process.env.PORT || 8080, () => {
    console.log(`Rodando na porta ${port}...`)
})

appWs(server)
