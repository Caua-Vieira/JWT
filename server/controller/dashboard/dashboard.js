const db = require("../../config/database")
const { resgatarDadosToken } = require("../../security/jwt")
const { criptografarSenha } = require("../../security/bcrypt")

async function logout(req, res) {
    try {

        const nomeUsuario = req.body.nomeUsuario

        await db.query(`
        UPDATE usuarios
            SET ultimo_login = current_timestamp
        WHERE nome = '${nomeUsuario}'
        `)

        return res.status(200).send({
            message: "Logout efetuado com sucesso!"
        })
    } catch (error) {
        return res.status(500).send({
            message: "Ocorreu um erro ao tentar gravar data de último login"
        })
    }
}

async function buscaInfosUsuario(req, res) {
    try {

        const nomeUsuario = req.params.nomeUsuario
        const token = req.headers.authorization

        const buscaDados = await db.query(`
        select email, data_criacao, ultimo_login from usuarios u 
        where nome = '${nomeUsuario}'    
        `)

        const dadosToken = resgatarDadosToken(token)

        if (buscaDados.rows.length == 0) {
            return res.status(406).send({
                message: "Não foi possível encontrar dados para usuário"
            })
        } else {
            const transformDados = buscaDados.rows.map((item) => {

                let horario = item.ultimo_login.toISOString().split('T')[0]
                let [year, month, day] = horario.split('-')
                horario = `${day}/${month}/${year}`

                let dataCriacao = item.data_criacao.toISOString().split('T')[0];
                let [ano, mes, dia] = dataCriacao.split('-')
                dataCriacao = `${dia}/${mes}/${ano}`

                return {
                    ...item,
                    data_criacao: dataCriacao,
                    ultimo_login: horario
                }
            })

            return res.status(200).send({
                data: transformDados,
                dadosToken
            })
        }

    } catch (error) {
        return res.status(500).send({
            message: "Ocorreu um erro ao buscar infos do usuário" + error.message
        })
    }
}

module.exports = {
    logout,
    buscaInfosUsuario
}