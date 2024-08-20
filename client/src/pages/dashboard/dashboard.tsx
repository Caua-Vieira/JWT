import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

function Dashboard() {

    const params = useParams()
    const navigate = useNavigate()

    const nomeUsuario = params.nomeUsuario
    const [email, setEmail] = useState<string>()
    const [ultimoLogin, setUltimoLogin] = useState<string>()
    const [dataCriacao, setDataCriacao] = useState<string>()

    function gravaLogin() {
        axios.put(`http://localhost:8000/grava/login`, {
            nomeUsuario
        }).then(function (resposta) {
            toast.success(resposta.data.message)
            navigate(-1)
        }).catch(function (erro) {
            toast.error(erro.response.data.message)
        })
    }

    function buscaInfosUsuario() {
        axios.get(`http://localhost:8000/busca/infos/${nomeUsuario}`)
            .then(function (resposta) {
                setEmail(resposta.data.data[0].email)
                setUltimoLogin(resposta.data.data[0].ultimo_login)
                setDataCriacao(resposta.data.data[0].data_criacao)
            }).catch(function (erro) {
                toast.error(erro.response.data.message)
            })
    }

    useEffect(() => {
        buscaInfosUsuario()
    }, [])

    return (
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
                            <p>Último login: {dataCriacao}</p>
                        </Card>
                    </Col>
                    <Col md={6} className="text-center">
                        <Card className="p-3">
                            <h5>Opções de Segurança</h5>
                            <Row>
                                <div className="col-6">
                                    <Button variant="primary" className="mt-4 w-100">
                                        Alterar Senha
                                    </Button>
                                </div>
                                <div className="col-6">
                                    <Button
                                        variant="danger"
                                        className="mt-4 w-100"
                                        onClick={gravaLogin}
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
                            <p>Token expira em: 2024-08-18 16:30</p>
                            <p>Usuário ID: 12345</p>
                        </Card>
                    </Col>
                </Row>

                <Row className="mt-4 text-center">
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
                </Row>
            </Card>
        </Container>
    );
}

export default Dashboard