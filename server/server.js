const express = require("express")
const app = express()

const port = 8000

const routes = require("./routes/usuarioAutenticacao.routes")
const routesDashboard = require("./routes/dashboard/dashboard.routes")
const routesEnvioEmail = require("./routes/security/envioEmail.routes")

const cors = require("cors")
const bodyParser = require("body-parser")

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(routes)
app.use(routesDashboard)
app.use(routesEnvioEmail)

app.listen(port, function () {
    console.log(`RODANDO NA PORTA: ` + port)
})