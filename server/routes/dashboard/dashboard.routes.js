const express = require("express")
const { logout, buscaInfosUsuario } = require("../../controller/dashboard")
const routesDashboard = express.Router()

routesDashboard.put("/grava/login", logout)
routesDashboard.get("/busca/infos/:nomeUsuario", buscaInfosUsuario)

module.exports = routesDashboard