const db = require("../config/database")
const { criptografarSenha, validaSenha } = require("../security/bcrypt")
const { criarJWT } = require("../security/jwt")

async function cadastraUsuario(req, res) {
    try {

        const {
            nome,
            senha,
            email
        } = req.body

        const senhaCriptografada = await criptografarSenha(senha)

        const verificaNomeUsuario = await db.query(`
        SELECT email FROM usuarios WHERE nome = '${nome}'    
        `)

        if (verificaNomeUsuario.rows.length != 0) {
            return res.status(406).send({
                message: "Email já cadastrado"
            })
        } else {
            await db.query(`
                insert into usuarios (
                nome,
                senha,
                email
                ) values (
                '${nome}',
                '${senhaCriptografada}',
                '${email}'
                )    
            `)

            return res.status(200).send({
                message: "Usuário cadastrado com sucesso"
            })
        }

    } catch (error) {
        return res.status(500).send({
            message: "Ocorreu um erro ao tentar cadastrar usuário: " + error.message
        })
    }
}

async function consultaLogin(req, res) {
    try {
        const {
            nome,
            senha
        } = req.params

        const buscaDados = await db.query(`
        SELECT id, nome, senha FROM usuarios
        WHERE nome = '${nome}'    
        `)

        if (buscaDados.rows.length == 0) {
            return res.status(406).send({
                message: "Usuário inexistente"
            })
        } else {

            const verificaSenha = await validaSenha(senha, buscaDados.rows[0].senha)

            if (verificaSenha) {

                const token = criarJWT(buscaDados.rows[0].id)

                return res.status(200).send({
                    message: "Login efetuado com sucesso",
                    token: token
                })
            } else {
                return res.status(401).send({
                    message: "Senha inválida"
                })
            }
        }

    } catch (error) {
        return res.status(500).send({
            message: "Ocorreu um erro ao tentar validar usuário: " + error.message
        })
    }
}

module.exports = {
    cadastraUsuario,
    consultaLogin
}