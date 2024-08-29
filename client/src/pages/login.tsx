import axios from "axios"
import { useEffect, useState } from "react"
import { Card, Col, Container, Form, Row } from "react-bootstrap"
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify"

function Login() {

    const [nomeBotao, setNomeBotao] = useState<string>("Cadastrar")
    const [mostraParaLogin, setMostraParaLogin] = useState<boolean>(true)
    const [mostraParaCadastro, setMostraParaCadastro] = useState<boolean>(false)
    const [nome, setNome] = useState<string>()
    const [senha, setSenha] = useState<string>()
    const [email, setEmail] = useState<string>()

    const navigate = useNavigate()

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

    return (
        <>

            <Container fluid className="bg-secondary d-flex justify-content-center align-items-center vh-100">
                <Row className="w-100 justify-content-center">
                    <Col xs={12} sm={8} md={6} lg={5}>
                        <Card className="p-4">
                            <Card.Body>
                                <h4 className="text-center">{mostraParaCadastro === false ? 'Cadastro' : 'Acesso'}</h4>

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
                                                onKeyDown={(e) => {
                                                    if (e.key === 'Enter') {
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

export default Login