import axios from "axios"
import { useState } from "react"
import { Form, Button, Col, Container, Row } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import Cookies from 'js-cookie';

function AlterarSenha() {

    const navigate = useNavigate()

    const [novaSenha, setNovaSenha] = useState<string>()
    const [confirmacaoSenha, setConfirmacaoSenha] = useState<string>()

    const token = Cookies.get('tokenAcesso');

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
        <Container className="mt-5">
            <Row className="justify-content-md-center">
                <Col md={6}>
                    <h2 className="text-center mb-4">Altere sua senha</h2>
                    <Form>
                        <Form.Group className="mb-3" controlId="formNovaSenha">
                            <Form.Label>Nova Senha</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Digite sua nova senha"
                                value={novaSenha}
                                onChange={(e) => setNovaSenha(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formConfirmacaoSenha">
                            <Form.Label>Confirme a Senha</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Confirme sua nova senha"
                                value={confirmacaoSenha}
                                onChange={(e) => setConfirmacaoSenha(e.target.value)}
                            />
                        </Form.Group>

                        <div className="d-grid">
                            <Button variant="primary" onClick={alterarSenha}>
                                Alterar Senha
                            </Button>
                        </div>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default AlterarSenha