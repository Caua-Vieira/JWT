const express = require("express")
const { verificaJWT } = require("../../security/jwt")
const { enviarEmail } = require("../../security/emailAlterarSenha")
const routesEnvioEmail = express.Router()

routesEnvioEmail.post("/envia/email/confirmacao", verificaJWT, enviarEmail)

module.exports = routesEnvioEmail