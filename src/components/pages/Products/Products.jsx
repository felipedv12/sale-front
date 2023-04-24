import React from "react";
import { Button, Image, Table } from "react-bootstrap";
import { API_URL } from '../../../constants/api';
import deleteIcon from '../../../assets/images/delete.png';
import editIcon from '../../../assets/images/edit.png';
import ProductForm from "./ProductForm";
import DeleteConfirmationModal from "../../common/DeleteConfirmationModal";
import Alert from "../../common/Alert";

class Products extends React.Component {
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
        this.setState({ showForm: true, formMode: 'create', formData: {}, formTitle: 'Novo produto' });
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
        this.setState({ showForm: true, formMode: 'edit', formData: product, formTitle: 'Alterar produto: ' + product.name });
    };

    handleShowAlert = () => {
        this.setState({ showAlert: true });
    }

    handleCloseAlert = () => {
        this.setState({ showAlert: false });
    }

    handleDeleteSuccess = () => {
        this.search();
        this.setState({ titleAlert: 'Sucesso', messageAlert: 'Produto excluído com sucesso.', typeAlert: 'alert alert-success', showAlert: true });
    }

    handleDeleteError = () => {
        this.search();
        this.setState({ titleAlert: 'Erro', messageAlert: 'Tivemos um problema ao excluir o produto, tente novamente.', typeAlert: 'alert alert-danger', showAlert: true });
    }

    search = () => {
        fetch(API_URL + '/products')
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
                    <td colSpan="7">Não há registros.</td>
                </tr>
            );
        } else {
            tableContent = this.state.data.map((product) => (
                <tr key={product.id}>
                    <td className="align-middle">{product.name}</td>
                    <td className="align-middle">{product.barcode}</td>
                    <td className="align-middle">{product.description}</td>
                    <td className="align-middle text-center">{product.price}</td>
                    <td className="align-middle text-center">{product.productType.name}</td>
                    <td className="align-middle text-center">{product.productType.taxPercentage}</td>
                    <td className="align-middle text-center">
                        <Button variant="link" onClick={() => this.handleDelete(product.id)}>
                            <Image src={deleteIcon} alt="Excluir" width={15} height={15} />
                        </Button>

                        <Button variant="link" onClick={() => this.handleEdit(product)}>
                            <Image src={editIcon} alt="Alterar" width={15} height={15} />
                        </Button>

                    </td>
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
                    <ProductForm
                        mode={this.state.formMode}
                        product={this.state.formData}
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
                    route="/products"

                />
                }

                <Button className="btn-primary" onClick={this.handleShowForm}>Novo produto</Button>
                <hr></hr>

                <Table striped bordered hover size="lg">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Código de barras</th>
                            <th>Descrição</th>
                            <th className="text-center">Preço</th>
                            <th className="text-center">Tipo</th>
                            <th className="text-center">Percentual de impostos</th>
                            <th className="text-center">Opções</th>
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

export default Products;