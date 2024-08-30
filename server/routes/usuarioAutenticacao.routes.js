const express = require("express")
const { cadastraUsuario, consultaLogin, alterarSenha } = require("../controller/usuarioAutenticacao")
const { verificaJWT } = require("../security/jwt")
const routes = express.Router()

routes.post("/cadastra/usuario", cadastraUsuario)
routes.get("/consulta/login/:nome/:senha", consultaLogin)
routes.put("/alterar/senha/usuario", verificaJWT, alterarSenha)

module.exports = routes