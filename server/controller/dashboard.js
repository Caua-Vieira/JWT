const db = require("../config/database")

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

        const buscaDados = await db.query(`
        select email, data_criacao from usuarios u 
        where nome = '${nomeUsuario}'    
        `)

        const transformDados = buscaDados.rows.map((item) => {

            let dataCriacao = item.data_criacao.toISOString().split('T')
            let [ano, mes, dia] = dataCriacao.split('-')
            dataCriacao = `${dia}/${mes}/${ano}`

            return {
                ...item,
                data_criacao: dataCriacao
            }
        })

        if (buscaDados.rows.length == 0) {
            return res.status(406).send({
                message: "Não foi possível encontrar dados para usuário"
            })
        } else {
            return res.status(200).send({
                data: transformDados
            })
        }

    } catch (error) {
        console.log(error)
        return res.status(500).send({
            message: "Ocorreu um erro ao buscar infos do usuário" + error.message
        })
    }
}

module.exports = {
    logout,
    buscaInfosUsuario
}