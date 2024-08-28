const express = require("express")
const { logout, buscaInfosUsuario, alterarSenha } = require("../../controller/dashboard")
const { verificaJWT } = require("../../security/jwt")
const { enviarEmail } = require("../../security/emailAlterarSenha")
const routesDashboard = express.Router()

routesDashboard.put("/grava/login", verificaJWT, logout)
routesDashboard.get("/busca/infos/:nomeUsuario", verificaJWT, buscaInfosUsuario)
routesDashboard.get("/alterar/senha", verificaJWT, alterarSenha)

routesDashboard.post("/envia/email/confirmacao", verificaJWT, enviarEmail)

module.exports = routesDashboard