import axios from "axios"
import { useEffect, useState } from "react"
import { Card, Col, Container, Form, Row } from "react-bootstrap"
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify"
import Cookies from 'js-cookie';

function UsuarioAutenticacao() {

    const [nomeBotao, setNomeBotao] = useState<string>("Cadastrar")
    const [mostraParaLogin, setMostraParaLogin] = useState<boolean>(false)
    const [mostraParaCadastro, setMostraParaCadastro] = useState<boolean>(true)
    const [mostraAlteracaoSenha, setMostraAlteracaoSenha] = useState<boolean>(true)
    const [nome, setNome] = useState<string>()
    const [senha, setSenha] = useState<string>()
    const [email, setEmail] = useState<string>()
    const [confirmacaoSenha, setConfirmacaoSenha] = useState<string>()

    const navigate = useNavigate()
    const { tipoAutenticacao } = useParams()

    function cadastrarUsuario() {
        if (!nome || !senha || !email) {
            return toast.info("Preencha nome e senha para cadastrar usuário")
        }

        axios.post(`http://localhost:8000/cadastra/usuario`, {
            nome,
            senha,
            email
        }).then(function (resposta) {
            toast.success(resposta.data.message)
            setMostraParaLogin(true)
            setMostraParaCadastro(false)
            setNome("Login")
            setNome("")
            setSenha("")
            setEmail("")
        }).catch(function (erro) {
            toast.error(erro.response.data.message)
            setNome("")
        })
    }

    function consultaLogin() {
        axios.get(`http://localhost:8000/consulta/login/${nome}/${senha}`)
            .then(function (resposta) {
                sessionStorage.setItem("token", resposta.data.token)
                toast.success(resposta.data.message)
                navigate(`/dashboard/${nome}`)
            }).catch(function (erro) {
                toast.error(erro.response.data.message)
                setNome("")
                setSenha("")
            })
    }

    const token = Cookies.get('tokenAcesso');

    function alterarSenha() {

        if (!senha || !confirmacaoSenha) {
            return toast.info("Preencha todos os campos para alterar senha")
        } else if (senha !== confirmacaoSenha) {
            return toast.info("As senhas são diferentes")
        }
        console.log(token)
        axios.put(`http://localhost:8000/alterar/senha`, {
            confirmacaoSenha,
            token
        }, {
            headers: {
                Authorization: token
            }
        }).then(function (resposta) {
            toast.success(resposta.data.message)
            navigate(`/dashboard/${resposta.data.nome}`)
        }).catch(function (erro) {
            if (erro.response.status === 403) {
                toast.error("Tempo para alteração excedido, envie um email de confirmação novamente", {
                    autoClose: 5000
                });
                navigate("/")
            } else {
                toast.error(erro.response.data.message)
                setSenha("")
                setConfirmacaoSenha("")
            }
        })
    }

    useEffect(() => {
        if (tipoAutenticacao === 'alterarSenha') {
            setMostraAlteracaoSenha(false)
            setMostraParaCadastro(true)
            setMostraParaLogin(true)
            setNomeBotao("Confirmar Alteração")
        }
    }, [])

    return (
        <>

            <Container fluid className="bg-secondary d-flex justify-content-center align-items-center vh-100">
                <Row className="w-100 justify-content-center">
                    <Col xs={12} sm={8} md={6} lg={5}>
                        <Card className="p-4">
                            <Card.Body>
                                <h4 className="text-center">{mostraParaCadastro === false
                                    ? 'Cadastro'
                                    : mostraParaLogin === false
                                        ? 'Acesso'
                                        : 'Altere sua senha'}
                                </h4>
                                <Form>
                                    <Row className="mt-3">
                                        <div className="form-group" hidden={mostraParaCadastro}>
                                            <label className="form-label">Email</label>
                                            <input
                                                type="email"
                                                className="form-control"
                                                placeholder="Insira o seu email"
                                                value={email}
                                                onChange={(e) => {
                                                    setEmail(e.target.value)
                                                }}
                                            />
                                        </div>
                                    </Row>

                                    <Row className="mt-3">
                                        <div className="form-group" hidden={!mostraAlteracaoSenha}>
                                            <label className="form-label">Nome</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Insira o nome de usuário"
                                                value={nome}
                                                onChange={(e) => {
                                                    setNome(e.target.value)
                                                }}
                                            />
                                        </div>
                                    </Row>

                                    <Row className="mt-3">
                                        <div className="form-group">
                                            <label className="form-label">Senha</label>
                                            <input
                                                type="password"
                                                className="form-control"
                                                placeholder="Insira sua senha"
                                                value={senha}
                                                onKeyDown={(e) => {
                                                    if (e.key === 'Enter' && mostraAlteracaoSenha) {
                                                        consultaLogin()
                                                    }
                                                }}
                                                onChange={(e) => {
                                                    setSenha(e.target.value)
                                                }}
                                            />
                                        </div>
                                    </Row>

                                    <Row className="mt-3">
                                        <div className="form-group" hidden={mostraAlteracaoSenha}>
                                            <label className="form-label">Nova Senha</label>
                                            <input
                                                type="password"
                                                className="form-control"
                                                placeholder="Confirme sua nova senha"
                                                value={confirmacaoSenha}
                                                onChange={(e) => {
                                                    setConfirmacaoSenha(e.target.value)
                                                }}
                                                onKeyDown={(e) => {
                                                    if (e.key === 'Enter') {
                                                        alterarSenha()
                                                    }
                                                }}
                                            />
                                        </div>
                                    </Row>

                                    <Row className="mt-3">
                                        <button
                                            type="button"
                                            className="mt-2 btn btn-primary"
                                            onClick={() => {
                                                if (nomeBotao === 'Cadastrar') {
                                                    cadastrarUsuario()
                                                } else if (nomeBotao === 'Login') {
                                                    consultaLogin()
                                                } else {
                                                    alterarSenha()
                                                }
                                            }}
                                        >
                                            {nomeBotao}
                                        </button>
                                    </Row>

                                    <Row className="mt-3">
                                        <div hidden={mostraParaLogin} className="text-center">
                                            <p>
                                                Ainda não possui cadastro?{' '}
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setNomeBotao("Cadastrar")
                                                        setMostraParaCadastro(false)
                                                        setMostraParaLogin(true)
                                                    }}
                                                    className="mb-1 btn btn-link p-0"
                                                >
                                                    Clique aqui
                                                </button>
                                            </p>
                                        </div>

                                        <div hidden={mostraParaCadastro} className="text-center">
                                            <p>
                                                Deseja fazer login?{' '}
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setNomeBotao("Login")
                                                        setMostraParaCadastro(true)
                                                        setMostraParaLogin(false)
                                                    }}
                                                    className="mb-1 btn btn-link p-0"
                                                >
                                                    Clique aqui
                                                </button>
                                            </p>
                                        </div>
                                    </Row>
                                </Form>

                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default UsuarioAutenticacao