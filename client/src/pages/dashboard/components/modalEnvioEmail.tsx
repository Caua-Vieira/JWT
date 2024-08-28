import axios from "axios";
import { useState } from "react";
import { Button, Container, Form, Modal, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface ModalEnvioEmailProps {
    isOpen: boolean;
    fecharModal: () => void
    token: string
}

const ModalEnvioEmail: React.FC<ModalEnvioEmailProps> = ({
    isOpen,
    fecharModal,
    token
}) => {

    const [email, setEmail] = useState<string>()

    const navigate = useNavigate()

    function enviaEmailConfirmacao() {
        axios.post(`http://localhost:8000/envia/email/confirmacao`, {
            email
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
            <Modal
                className="mt-3"
                // size="lg"
                show={isOpen}
                onShow={() => {
                    setEmail("")
                }}
            >

                <Modal.Header className="bg-white justify-content-center">
                    <Modal.Title className="w-100 text-center text-dark">{"Enviar e-mail para alteração"}</Modal.Title>
                    <i
                        className="bi bi-x-circle"
                        style={{ fontSize: '2rem', cursor: 'pointer' }}
                        onClick={() => {
                            fecharModal()
                        }}
                    ></i>
                </Modal.Header >
                <Modal.Body className="bg-white">
                    <Container>
                        <h6 className="text-center">Preencha o e-mail abaixo para enviarmos a confirmação de alteração de senha:</h6>

                        <Row className="mt-3">
                            <div className="form-group">
                                <label className="form-label">Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    placeholder="Insira o seu email"
                                    value={email}
                                    autoFocus
                                    onChange={(e) => {
                                        setEmail(e.target.value)
                                    }}
                                />
                            </div>
                        </Row>

                    </Container>

                </Modal.Body>

                <Modal.Footer>
                    <div className="align-items-end">
                        <Button
                            variant="primary"
                            className="me-2"
                            onClick={enviaEmailConfirmacao}
                        >
                            <i className="bi bi-save"></i> Enviar
                        </Button>

                        <Button
                            variant="danger"
                            className=""
                            onClick={() => fecharModal()}
                        >
                            Cancelar
                        </Button>
                    </div>

                </Modal.Footer>


            </Modal>
        </>
    )

}

export default ModalEnvioEmail