const bcrypt = require('bcrypt')

async function criptografarSenha(senha) {
    try {
        const saltRounds = 10;
        const hash = await bcrypt.hash(senha, saltRounds);
        return hash;
    } catch (error) {
        throw new Error('Erro ao criptografar senha: ' + error.message);
    }
}

async function validaSenha(senha, senhaCadastrada) {
    try {

        const comparador = await bcrypt.compare(senha, senhaCadastrada)

        return comparador

    } catch (error) {
        throw new Error('Erro ao comparar senha: ' + error.message);
    }
}

module.exports = {
    criptografarSenha,
    validaSenha
}