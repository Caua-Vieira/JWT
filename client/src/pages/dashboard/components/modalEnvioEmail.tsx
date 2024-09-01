import axios from "axios";
import { useState } from "react";
import { Button, Container, Form, Modal, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ModalCarregando from "../../../components/modalCarregando";

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
    const [processando, setProcessando] = useState<boolean>(false)
    const [mostraModalCarregando, setMostraModalCarregando] = useState<boolean>(false)
    const [ocultaModal, setOcultaModal] = useState<boolean>(false)

    const navigate = useNavigate()

    function enviaEmailConfirmacao() {
        setProcessando(true)
        setMostraModalCarregando(true)
        setOcultaModal(true)
        axios.post(`http://localhost:8000/envia/email/confirmacao`, {
            email,
            token
        }, {
            headers: {
                Authorization: token
            },
            withCredentials: true
        }).then(function (resposta) {
            toast.success(resposta.data.message)
            fecharModal()
        }).catch(function (erro) {
            if (erro.response.status === 403) {
                toast.error(erro.response.data.message)
                navigate("/")
            } else {
                toast.error(erro.response.data.message)
            }
        }).finally(function () {
            setProcessando(false)
            setMostraModalCarregando(false)
            setOcultaModal(false)
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
                hidden={ocultaModal}
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
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' && !processando) {
                                            enviaEmailConfirmacao()
                                        }
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
                            onClick={() => {
                                if (!processando) {
                                    enviaEmailConfirmacao()
                                }
                            }}
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

            <ModalCarregando
                isOpen={mostraModalCarregando}
                mensagem="Enviando e-mail..."
            />
        </>
    )

}

export default ModalEnvioEmail