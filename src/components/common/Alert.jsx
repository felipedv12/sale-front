import React from "react";
import { Button, Modal } from "react-bootstrap";

class Alert extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {show, handleClose, title, message, type} = this.props;
        return (
            
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className={type} role="alert">
                        {message}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Fechar
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}


export default Alert;