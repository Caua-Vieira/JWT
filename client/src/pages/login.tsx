import axios from "axios"
import { useState } from "react"
import { Card, Col, Container, Form, Row } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

function Login() {

    const [nomeBotao, setNomeBotao] = useState<string>("Cadastrar")
    const [mostraParagLogin, setMostraParagLogin] = useState<boolean>(true)
    const [mostraParagCadastro, setMostraParagCadastro] = useState<boolean>(false)
    const [nome, setNome] = useState<string>()
    const [senha, setSenha] = useState<string>()

    const navigate = useNavigate()

    function cadastrarUsuario() {
        if (!nome || !senha) {
            toast.info("Preencha nome e senha para cadastrar usuário")
        }

        axios.post(`http://localhost:8000/cadastra/usuario`, {
            nome,
            senha
        }).then(function (resposta) {
            toast.success(resposta.data.message)
            setMostraParagLogin(true)
            setMostraParagCadastro(false)
            setNome("Login")
            setNome("")
            setSenha("")
        }).catch(function (erro) {
            toast.error(erro.response.data.message)
            setNome("")
        })
    }

    function consultaLogin() {
        axios.get(`http://localhost:8000/consulta/login/${nome}/${senha}`)
            .then(function (resposta) {
                toast.success(resposta.data.message)
                navigate("/dashboard")
            }).catch(function (erro) {
                toast.error(erro.response.data.message)
                setNome("")
                setSenha("")
            })
    }

    return (
        <>

            <Container fluid className="bg-secondary d-flex justify-content-center align-items-center vh-100">
                <Row className="w-100 justify-content-center">
                    <Col xs={12} sm={8} md={6} lg={5}>
                        <Card className="p-4">
                            <Form>
                                <Card.Body>
                                    <h4 className="text-center">Cadastro ou Acesso</h4>
                                    <form>
                                        <Row className="mt-3">
                                            <div className="form-group">
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
                                                    onChange={(e) => {
                                                        setSenha(e.target.value)
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
                                                    } else {
                                                        consultaLogin()
                                                    }
                                                }}
                                            >
                                                {nomeBotao}
                                            </button>
                                        </Row>

                                        <Row className="mt-3">
                                            <div hidden={mostraParagLogin} className="text-center">
                                                <p>
                                                    Ainda não possui login?{' '}
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            setNomeBotao("Cadastrar")
                                                            setMostraParagCadastro(false)
                                                            setMostraParagLogin(true)
                                                        }}
                                                        className="mb-1 btn btn-link p-0"
                                                    >
                                                        Clique aqui
                                                    </button>
                                                </p>
                                            </div>

                                            <div hidden={mostraParagCadastro} className="text-center">
                                                <p>
                                                    Deseja fazer login?{' '}
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            setNomeBotao("Login")
                                                            setMostraParagCadastro(true)
                                                            setMostraParagLogin(false)
                                                        }}
                                                        className="mb-1 btn btn-link p-0"
                                                    >
                                                        Clique aqui
                                                    </button>
                                                </p>
                                            </div>
                                        </Row>
                                    </form>
                                </Card.Body>
                            </Form>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Login