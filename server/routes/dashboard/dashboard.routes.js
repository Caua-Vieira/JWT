const express = require("express")
const { logout, buscaInfosUsuario, alterarSenha } = require("../../controller/dashboard")
const { verificaJWT } = require("../../security/jwt")
const routesDashboard = express.Router()

routesDashboard.put("/grava/login", verificaJWT, logout)
routesDashboard.get("/busca/infos/:nomeUsuario", verificaJWT, buscaInfosUsuario)
routesDashboard.put("/alterar/senha", verificaJWT, alterarSenha)

module.exports = routesDashboard