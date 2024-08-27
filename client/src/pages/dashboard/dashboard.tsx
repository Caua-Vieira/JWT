import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import ModalAlterarSenha from "./components/modalAlterarSenha";

function Dashboard() {

    const params = useParams()
    const navigate = useNavigate()

    const token = sessionStorage.getItem("token") || ""

    const nomeUsuario = params.nomeUsuario
    const [email, setEmail] = useState<string>()
    const [ultimoLogin, setUltimoLogin] = useState<string>()
    const [dataCriacao, setDataCriacao] = useState<string>()
    const [expiracaoToken, setExpiracaoToken] = useState<string>()
    const [idUsuario, setIdUsuario] = useState<number>()
    const [criacaoToken, setCriacaoToken] = useState<string>()
    const [mostraModalAlterarSenha, setMostraModalAlterarSenha] = useState<boolean>(false)

    function gravaLogin() {
        axios.put(`http://localhost:8000/grava/login`, {
            nomeUsuario
        }, {
            headers: {
                Authorization: token
            }
        }).then(function (resposta) {
            toast.success(resposta.data.message)
            navigate(-1)
        }).catch(function (erro) {
            if (erro.response.status === 403) {
                toast.error(erro.response.data.message)
                navigate("/")
            } else {
                toast.error(erro.response.data.message)
            }
        })
    }

    function buscaInfosUsuario() {
        axios.get(`http://localhost:8000/busca/infos/${nomeUsuario}`, {
            headers: {
                Authorization: token
            }
        })
            .then(function (resposta) {
                setExpiracaoToken(resposta.data.dadosToken.expiracao)
                setCriacaoToken(resposta.data.dadosToken.criacao)
                setIdUsuario(resposta.data.dadosToken.idUsuario)
                setEmail(resposta.data.data[0].email)
                setUltimoLogin(resposta.data.data[0].ultimo_login)
                setDataCriacao(resposta.data.data[0].data_criacao)
            }).catch(function (erro) {
                if (erro.response.status === 403) {
                    toast.error(erro.response.data.message)
                    navigate("/")
                } else {
                    toast.error(erro.response.data.message)
                }
            })
    }

    function enviaEmailConfirmacao() {
        axios.post(`http://localhost:8000/envia/email/confirmacao`, {
            email
        }, {
            headers: {
                Authorization: token
            }
        }).then(function (resposta) {
            toast.success(resposta.data.message);
        }).catch(function (erro) {
            if (erro.response.status === 403) {
                toast.error(erro.response.data.message)
                navigate("/")
            } else {
                toast.error(erro.response.data.message)
            }
        })
    }

    useEffect(() => {
        buscaInfosUsuario()
    }, [])

    return (
        <>
            <Container className="mt-5">
                <Card className="p-4">
                    <h2 className="text-center">Bem-vindo(a), {nomeUsuario}!</h2>
                    <p className="text-center">Último login: {ultimoLogin}</p>

                    <Row className="mt-4">
                        <Col md={6} className="text-center">
                            <Card className="p-3">
                                <h5>Dados do Usuário</h5>
                                <p>Nome: {nomeUsuario}</p>
                                <p>Email: {email}</p>
                                <p>Data de criação: {dataCriacao}</p>
                                <p>Último login: {ultimoLogin}</p>
                            </Card>
                        </Col>
                        <Col md={6} className="text-center">
                            <Card className="p-3">
                                <h5>Opções de Segurança</h5>
                                <Row>
                                    <div className="col-6">
                                        <Button
                                            variant="primary"
                                            className="mt-4 w-100"
                                            onClick={() => setMostraModalAlterarSenha(true)}
                                        >
                                            Alterar Senha
                                        </Button>
                                    </div>
                                    <div className="col-6">
                                        <Button
                                            variant="danger"
                                            className="mt-4 w-100"
                                            onClick={() => {
                                                sessionStorage.removeItem("token");
                                                gravaLogin()
                                            }}
                                        >
                                            Logout
                                        </Button>
                                    </div>
                                </Row>
                            </Card>
                        </Col>
                    </Row>

                    <Row className="mt-4 text-center">
                        <Col>
                            <Card className="p-3">
                                <h5>Dados do Token JWT</h5>
                                <p>Token gerado em: {criacaoToken}</p>
                                <p>Token expira em: {expiracaoToken}</p>
                                <p>ID do usuário: {idUsuario}</p>
                            </Card>
                        </Col>
                    </Row>

                    {/* <Row className="mt-4 text-center">
                        <Col>
                            <Card className="p-3">
                                <h5>Ações Rápidas</h5>
                                <Button variant="success" className="m-2">
                                    Ver Perfil
                                </Button>
                                <Button variant="info" className="m-2">
                                    Configurações
                                </Button>
                                <Button variant="secondary" className="m-2">
                                    Gerenciar Contas
                                </Button>
                            </Card>
                        </Col>
                    </Row> */}
                </Card>
            </Container>

            <ModalAlterarSenha
                isOpen={mostraModalAlterarSenha}
                fecharModal={() => { setMostraModalAlterarSenha(false) }}
                token={token}
            />
        </>

    );
}

export default Dashboard