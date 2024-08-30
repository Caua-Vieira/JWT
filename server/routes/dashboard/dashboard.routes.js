const express = require("express")
const { logout, buscaInfosUsuario, alterarSenha } = require("../../controller/dashboard/dashboard")
const { verificaJWT } = require("../../security/jwt")
const { enviarEmail } = require("../../security/emailAlterarSenha")
const routesDashboard = express.Router()

routesDashboard.put("/grava/login", verificaJWT, logout)
routesDashboard.get("/busca/infos/:nomeUsuario", verificaJWT, buscaInfosUsuario)

module.exports = routesDashboard