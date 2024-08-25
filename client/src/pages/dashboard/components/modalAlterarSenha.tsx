import axios from "axios";
import { useState } from "react";
import { Button, Container, Form, Modal, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface ModalAlterarSenhaProps {
    isOpen: boolean;
    fecharModal: () => void
    token: string
}

const ModalAlterarSenha: React.FC<ModalAlterarSenhaProps> = ({
    isOpen,
    fecharModal,
    token
}) => {

    const [email, setEmail] = useState<string>()
    const [novaSenha, setNovaSenha] = useState<string>()
    const [confirmacaoSenha, setConfirmacaoSenha] = useState<string>()

    const navigate = useNavigate()

    function alterarSenha() {
        if (!email || !novaSenha || !confirmacaoSenha) {
            return toast.info("Preencha todos os campos para alterar senha")
        } else if (novaSenha !== confirmacaoSenha) {
            return toast.info("As senhas são diferentes")
        }

        axios.put(`http://localhost:8000/alterar/senha`, {
            email,
            confirmacaoSenha
        }, {
            headers: {
                Authorization: token
            }
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
                    setNovaSenha("")
                    setConfirmacaoSenha("")
                }}
            >

                <Modal.Header className="bg-white justify-content-center">
                    <Modal.Title className="w-100 text-center text-dark">{"Alterar senha"}</Modal.Title>
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
                        <h6 className="text-center">Preencha os dados abaixo para alterar sua senha:</h6>

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

                        <Row className="mt-3">
                            <div className="form-group">
                                <label className="form-label">Nova senha</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Insira a nova senha"
                                    value={novaSenha}
                                    onChange={(e) => {
                                        setNovaSenha(e.target.value)
                                    }}
                                />
                            </div>
                        </Row>

                        <Row className="mt-3">
                            <div className="form-group">
                                <label className="form-label">Confirmação de senha</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Confirme a nova senha"
                                    value={confirmacaoSenha}
                                    onChange={(e) => {
                                        setConfirmacaoSenha(e.target.value)
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
                            onClick={alterarSenha}
                        >
                            <i className="bi bi-save"></i> Salvar
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

export default ModalAlterarSenha