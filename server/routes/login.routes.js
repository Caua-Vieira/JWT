const express = require("express")
const { cadastraUsuario } = require("../controller/login")
const routes = express.Router()

routes.post("/cadastra/usuario", cadastraUsuario)

module.exports = routes