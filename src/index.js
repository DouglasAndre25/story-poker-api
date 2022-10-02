const app = require('./app')
const appWs = require('./app-ws')
const port = process.env.PORT || 8080

app.listen(port, () => {
    console.log(`Rodando na porta ${port}...`)
})

appWs(app)
