const express = require("express")
const { cadastraUsuario, consultaLogin } = require("../controller/login")
const routes = express.Router()

routes.post("/cadastra/usuario", cadastraUsuario)
routes.get("/consulta/login/:nome/:senha", consultaLogin)

module.exports = routes