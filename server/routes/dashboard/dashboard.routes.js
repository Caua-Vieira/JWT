const express = require("express")
const { logout, buscaInfosUsuario } = require("../../controller/dashboard")
const { verificaJWT } = require("../../security/jwt")
const routesDashboard = express.Router()

routesDashboard.put("/grava/login", verificaJWT, logout)
routesDashboard.get("/busca/infos/:nomeUsuario", verificaJWT, buscaInfosUsuario)

module.exports = routesDashboard