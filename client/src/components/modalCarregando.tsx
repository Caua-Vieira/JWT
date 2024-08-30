import axios from "axios";
import { useState } from "react";
import { Button, Container, Form, Modal, Row, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface ModalCarregandoProps {
    isOpen: boolean;
    mensagem: string
}

const ModalCarregando: React.FC<ModalCarregandoProps> = ({
    isOpen,
    mensagem
}) => {

    return (
        <>
            <Modal show={isOpen} centered>
                <Modal.Body className="text-center bg-dark text-white">
                    <Spinner animation="border" role="status" className="mb-3 text-white">
                    </Spinner>
                    <p>{mensagem}</p>
                </Modal.Body>
            </Modal>
        </>
    )

}

export default ModalCarregando