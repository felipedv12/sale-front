import React from "react";
import { Button, Image, Table } from "react-bootstrap";
import { API_URL } from '../../../constants/api';
import deleteIcon from '../../../assets/images/delete.png';
import editIcon from '../../../assets/images/edit.png';
import ProductForm from "./ProductForm";

class Products extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            showForm: false,
            formMode: '',
            formData: {},
            buttonLabel: '',
            formTitle: ''
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

    handleEdit = (product) => {
        this.setState({ showForm: true, formMode: 'edit', formData: product, formTitle: 'Alterar produto: '+ product.name  });
    };
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

    delete = (id) => {
        let errorMessage;
        /*fetch(API_URL + '/products/' + id, { method: 'DELETE' })
            .then(res => res.json())
            .then(
                (result) => {
                    if (result.success) {
                        this.search();
                    }
                    else {
                        errorMessage = result.message;
                    }
                },
                (error) => {
                    console.log(error);
                }
            );*/
        console.log('teste');
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
                        <Button variant="link" onClick={() => this.delete(product.id)}>
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
                {this.state.showForm &&
                    <ProductForm
                        mode={this.state.formMode}
                        product={this.state.formData}
                        show={this.state.showForm}
                        onHide={this.handleHideForm}
                        title={this.state.formTitle}
                        buttonLabel={this.state.buttonLabel}
                
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