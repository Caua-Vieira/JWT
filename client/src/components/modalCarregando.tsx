import { Modal, Spinner } from "react-bootstrap";

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