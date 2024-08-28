import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

function AlterarSenha() {

    const navigate = useNavigate()

    const [novaSenha, setNovaSenha] = useState<string>()
    const [confirmacaoSenha, setConfirmacaoSenha] = useState<string>()

    const token = sessionStorage.getItem("token") || ""

    function alterarSenha() {
        if (!novaSenha || !confirmacaoSenha) {
            return toast.info("Preencha todos os campos para alterar senha")
        } else if (novaSenha !== confirmacaoSenha) {
            return toast.info("As senhas são diferentes")
        }

        axios.put(`http://localhost:8000/alterar/senha`, {
            confirmacaoSenha
        }, {
            headers: {
                Authorization: token
            }
        }).then(function (resposta) {
            toast.success(resposta.data.message)
        }).catch(function (erro) {
            if (erro.response.status === 403) {
                toast.error(erro.response.data.message)
                navigate("/")
            } else {
                toast.error(erro.response.data.message)
            }
        })
    }

    return (
        <>
            <h1>Altere sua senha</h1>
            <button onClick={alterarSenha}>teste</button>
        </>
    )
}

export default AlterarSenha