const bcrypt = require('bcrypt')

async function criptografarSenha(senha) {
    try {
        const saltRounds = 10;
        const hash = await bcrypt.hash(senha, saltRounds);
        return hash;
    } catch (error) {
        throw new Error('Erro ao criptografar a senha: ' + error.message);
    }
}

module.exports = { criptografarSenha }