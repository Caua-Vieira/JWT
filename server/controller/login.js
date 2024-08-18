const db = require("../config/database")
const { criptografarSenha } = require("../security/bcrypt")

async function cadastraUsuario(req, res) {
    try {
        const {
            nome,
            senha
        } = req.body

        const senhaCriptografada = await criptografarSenha(senha)

        const verificaNomeUsuario = await db.query(`
        SELECT nome FROM usuarios WHERE nome = '${nome}'    
        `)

        if (verificaNomeUsuario.rows.length != 0) {
            return res.status(406).send({
                message: "Nome de usuário já existente"
            })
        } else {
            await db.query(`
                insert into usuarios (
                nome,
                senha
                ) values (
                '${nome}',
                '${senhaCriptografada}'
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

module.exports = {
    cadastraUsuario
}