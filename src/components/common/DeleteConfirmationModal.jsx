import React from "react";
import { Button, Modal } from "react-bootstrap";
import { API_URL } from "../../constants/api";

class DeleteConfirmationModal extends React.Component {

    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            id: props.id || '',
            route: props.route || ''
        };

    }

    handleDelete = () => {
        fetch(API_URL + this.state.route + '/' + this.state.id, { method: 'DELETE' })
            .then(res => res.json())
            .then(
                (result) => {
                    this.props.handleCancel();
                    this.props.handleSuccess();
                },
                (error) => {
                    console.log(error);
                    this.props.handleError();
                }
            );
    }


    render() {
        const { show, onHide, handleCancel } = this.props;
        return (
            <Modal show={show} onHide={onHide}>
                <Modal.Dialog>
                    <Modal.Header closeButton>
                        <Modal.Title>Tem certeza que deseja excluir?</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <p>Essa ação é irreversível e o produto será permanentemente excluído do sistema.</p>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCancel} >Cancelar</Button>
                        <Button variant="primary" onClick={() => this.handleDelete()} >Confirmar</Button>
                    </Modal.Footer>
                </Modal.Dialog>
            </Modal>
        );
    }
}

export default DeleteConfirmationModal;