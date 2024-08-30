const nodemailer = require('nodemailer')
const db = require("../config/database")

const transport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587, // Porta 587 para STARTTLS
    secure: false, // false para STARTTLS
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
    tls: {
        rejectUnauthorized: false // Ignorar erros de certificados (opcional)
    }
});

async function enviarEmail(req, res) {
    try {

        const { email, token } = req.body

        const verificaEmail = await db.query(`
        SELECT email FROM usuarios WHERE email = '${email}'    
        `)

        if (verificaEmail.rows.length == 0) {
            return res.status(406).send({
                message: "E-mail não cadastrado"
            })
        }

        const emailOptions = {
            from: `JWT Dashboard <${process.env.EMAIL_USER}>`,
            to: email,
            subject: 'Confirmação de alteração de senha',
            text: `Clique no link abaixo para confirmar alteração de senha: \n\nhttp://localhost:3000/usuario/autenticacao/alterarSenha`
        }

        transport.sendMail(emailOptions, (error, info) => {
            if (error) {
                return res.status(500).send({
                    message: "Erro ao tentar enviar e-mail"
                })
            } else {

                res.cookie('tokenAcesso', token, {
                    maxAge: 300000,
                    httpOnly: false
                });

                return res.status(200).send({
                    message: "E-mail de confirmação enviado com sucesso"
                })
            }
        })

    } catch (error) {
        return res.status(500).send({
            message: "Ocorreu um erro ao tentar enviar e-mail de confirmação"
        })
    }
}

module.exports = {
    enviarEmail
}