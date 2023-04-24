import React from "react";
import { Button, Image, Table } from "react-bootstrap";
import { API_URL } from '../../../constants/api';
import deleteIcon from '../../../assets/images/delete.png';
import editIcon from '../../../assets/images/edit.png';
import ProductTypeForm from "./ProductTypeForm";
import DeleteConfirmationModal from "../../common/DeleteConfirmationModal";
import Alert from "../../common/Alert";

class ProductTypes extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            showForm: false,
            showConfirmationModal: false,
            deleteId: 0,
            formMode: '',
            formData: {},
            buttonLabel: '',
            formTitle: '',
            showAlert: false,
            titleAlert: '',
            messageAlert: '',
            typeAlert: '',
        };

    }

    componentWillUnmount() {
        this.state = {
            data: []
        };
    }

    componentDidMount() {
        this.search();
    }

    handleShowForm = () => {
        this.setState({ showForm: true, formMode: 'create', formData: {}, formTitle: 'Novo tipo de produto' });
    };

    handleHideForm = () => {
        this.setState({ showForm: false });
    };

    handleDelete = (id) => {
        this.setState({
            deleteId: id,
            showConfirmationModal: true
        });
    }

    handleHideConfirmation = () => {
        this.setState({ showConfirmationModal: false });
    }

    handleEdit = (product) => {
        this.setState({ showForm: true, formMode: 'edit', formData: product, formTitle: 'Alterar tipo de produto: ' + product.name });
    };

    handleShowAlert = () => {
        this.setState({ showAlert: true });
    }

    handleCloseAlert = () => {
        this.setState({ showAlert: false });
    }

    handleDeleteSuccess = () => {
        this.search();
        this.setState({ titleAlert: 'Sucesso', messageAlert: 'Tipo de produto excluído com sucesso.', typeAlert: 'alert alert-success', showAlert: true });
    }

    handleDeleteError = () => {
        this.search();
        this.setState({ titleAlert: 'Erro', messageAlert: 'Tivemos um problema ao excluir o tipo de produto, tente novamente.', typeAlert: 'alert alert-danger', showAlert: true });
    }

    search = () => {
        fetch(API_URL + '/product-types')
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState(result);
                },
                (error) => {
                    console.log(error);
                }
            );
    }

    render() {

        let tableContent;
        if (this.state.data.length === 0) {
            tableContent = (
                <tr className="text-center">
                    <td colSpan="4">Não há registros.</td>
                </tr>
            );
        } else {
            tableContent = this.state.data.map((productType) => (
                <tr key={productType.id}>
                    <td className="align-middle">{productType.name}</td>
                    <td className="align-middle text-center">{productType.taxPercentage}</td>
                    <td className="align-middle text-center">
                        <Button variant="link" onClick={() => this.handleDelete(productType.id)} disabled={!productType.allowDelete}>
                            <Image src={deleteIcon} alt="Excluir" width={15} height={15} />
                        </Button>

                        <Button variant="link" onClick={() => this.handleEdit(productType)} disabled={!productType.allowDelete}>
                            <Image src={editIcon} alt="Alterar" width={15} height={15} />
                        </Button>

                    </td>
                    <td className="align-middle text-center">{!productType.allowDelete ? 'Tipo de produto em uso' : ''}</td>
                </tr>
            ));
        }


        return (
            <div className="m-3">
                <div>


                    {this.state.showAlert && 
                    <Alert
                        show={this.state.showAlert}
                        handleClose={this.handleCloseAlert}
                        title={this.state.titleAlert}
                        message={this.state.messageAlert}
                        type={this.state.typeAlert}
                    />
                    }
                </div>
                {this.state.showForm &&
                    <ProductTypeForm
                        mode={this.state.formMode}
                        productType={this.state.formData}
                        show={this.state.showForm}
                        onHide={this.handleHideForm}
                        title={this.state.formTitle}
                        buttonLabel={this.state.buttonLabel}
                        onSuccess={this.search}

                    />
                }

                {this.state.showConfirmationModal && <DeleteConfirmationModal
                    show={this.state.showConfirmationModal}
                    onHide={this.handleHideConfirmation}
                    handleCancel={this.handleHideConfirmation}
                    handleSuccess={this.handleDeleteSuccess}
                    handleError={this.handleDeleteError}
                    id={this.state.deleteId}
                    route="/product-types"

                />
                }

                <Button className="btn-primary" onClick={this.handleShowForm}>Novo tipo de produto</Button>
                <hr></hr>

                <Table striped bordered hover size="lg">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th className="text-center">Percentual de impostos</th>
                            <th className="text-center">Opções</th>
                            <th className="text-center">Observação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableContent}
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default ProductTypes;