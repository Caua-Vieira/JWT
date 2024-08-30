const jwt = require("jsonwebtoken")

function criarJWT(idUsuario) {
    try {
        const token = jwt.sign({ user_id: idUsuario }, process.env.CHAVE_JWT, { expiresIn: '1h' })

        return token;
    } catch (error) {
        throw new Error('Erro ao gerar token: ' + error.message);
    }
}

function verificaJWT(req, res, next) {
    try {
        const authorization = req.headers.authorization

        if (!authorization) {
            console.log("aqui")
            return res.status(403).send({
                message: "Token inválido, faça o login novamente"
            })
        }
        jwt.verify(authorization, process.env.CHAVE_JWT, function (erro) {
            if (erro) {
                console.log(2)
                return res.status(403).send({
                    message: "Token inválido, faça o login novamente"
                })
            } else {
                next()
            }
        })

    } catch (error) {
        res.status(500).send({
            message: 'Erro ao verificar token: ' + error.message
        });
    }
}

function resgatarDadosToken(token) {
    try {
        const tokenDecodificado = jwt.verify(token, process.env.CHAVE_JWT);

        if (!tokenDecodificado) {
            throw new Error("Token inválido")
        }

        const expiracao = new Date(tokenDecodificado.exp * 1000);
        const idUsuario = tokenDecodificado.user_id;
        const criacao = new Date(tokenDecodificado.iat * 1000);

        return {
            expiracao: expiracao.toLocaleString(),
            idUsuario: idUsuario,
            criacao: criacao.toLocaleString()
        };


    } catch (error) {
        throw new Error('Erro ao decodificar token: ' + error.message);
    }
}

module.exports = {
    criarJWT,
    verificaJWT,
    resgatarDadosToken
}