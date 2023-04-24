import React from "react";
import { Button, Image, Table } from "react-bootstrap";
import { API_URL } from "../../../constants/api";
import viewIcon from '../../../assets/images/view.png';
import SaleForm from "./SaleForm";
import SaleItems from "./SaleItems";

class Sales extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedSale: null,
            data: [],
            products: [],
            showForm: false,
            showItems: false
        };
    }

    componentWillUnmount() {
        this.setState({
            data: []
        });
    }

    componentDidMount() {
        this.search();
        this.searchProducts();
    }

    handleSaleClick = (sale) => {

        this.setState({ showItems: true, selectedSale: sale });
    }

    handleCloseItems = () => {
        this.setState({ showItems: false });
    }

    handleHideForm = () => {
        this.setState({ showForm: false });
    };

    handleShowForm = () => {
        this.setState({ showForm: true });
    };

    handleOnSuccess = () => {
        this.search();
        this.handleHideForm();
    }

    searchProducts = () => {
        fetch(API_URL + '/products')
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({ products: result.data }, () => { console.log(this.state) });
                },
                (error) => {
                    console.log(error);
                }
            );
    }

    search = () => {
        fetch(API_URL + '/sales')
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({ data: result.data }, () => { console.log(this.state) });
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
                    <td colSpan="5">Não há registros.</td>
                </tr>
            );
        } else {
            tableContent = (this.state.data.map((sale) => (
                <tr key={sale.id}>
                    <td className="align-middle text-center">{sale.id}</td>
                    <td className="align-middle text-center">{sale.createdAt}</td>
                    <td className="align-middle text-center">{sale.totalProductValue}</td>
                    <td className="align-middle text-center">{sale.totalTaxValue}</td>
                    <td className="align-middle text-center"><Button variant="link" onClick={() => this.handleSaleClick(sale)}>
                        <Image src={viewIcon} alt="Visualizar" width={15} height={15} />
                    </Button></td>
                </tr>
            )));
        }


        return (
            <div className="m-3">
                {
                    this.state.showForm &&
                    <SaleForm show={this.state.showForm} onHide={this.handleHideForm} onSuccess={this.handleOnSuccess} products={this.state.products} />
                }

                {
                    this.state.showItems &&
                    <SaleItems show={this.state.showItems} onHide={this.handleCloseItems} sale={this.state.selectedSale} />
                }

                <Button className="btn-primary" onClick={this.handleShowForm}>Realizar venda</Button>
                <hr></hr>

                <Table striped bordered hover size="lg">
                    <thead>
                        <tr>
                            <th className="text-center">Número da venda</th>
                            <th className="text-center">Data da venda</th>
                            <th className="text-center">Valor total da venda</th>
                            <th className="text-center">Valor total de impostos</th>
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

export default Sales;