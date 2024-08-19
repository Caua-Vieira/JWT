import axios from "axios";
import { Button, Card, Col, Container, Row } from "react-bootstrap";

function Dashboard() {

    const nomeUsuario = "Cauã"; // Exemplo de como você pode puxar o nome do usuário
    const lastLogin = "2024-08-18 14:30"; // Exemplo de como você pode puxar a última data de login

    function consultaUltimoLogin() {
        axios.get(`http://localhost:8000/consulta/${nomeUsuario}`)
            .then(function (resposta) {

            }).catch(function (erro) {

            })
    }

    return (
        <Container className="mt-5">
            <Card className="p-4">
                <h2 className="text-center">Bem-vindo(a), {nomeUsuario}!</h2>
                <p className="text-center">Último login: {lastLogin}</p>

                <Row className="mt-4">
                    <Col md={6} className="text-center">
                        <Card className="p-3">
                            <h5>Dados do Usuário</h5>
                            <p>Nome: {nomeUsuario}</p>
                            <p>Email: exemplo@exemplo.com</p>
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
                                    <Button variant="danger" className="mt-4 w-100">
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