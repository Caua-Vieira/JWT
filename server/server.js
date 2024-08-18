const express = require("express")
const app = express()

const port = 8000

const routes = require("./routes/login.routes")

const cors = require("cors")
app.use(cors())

const bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(routes)

app.listen(port, function () {
    console.log(`RODANDO NA PORTA: ` + port)
})