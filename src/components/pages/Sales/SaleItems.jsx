import React from 'react';
import {  Col, Modal, Row, Table } from 'react-bootstrap';
import 'react-bootstrap-typeahead/css/Typeahead.css';



function SaleItems(props) {
    let tableContent;
    if (props.sale.items.length === 0) {
        tableContent = (
            <tr className="text-center">
                <td colSpan="5">Não há registros.</td>
            </tr>
        );
    } else {
        tableContent = (props.sale.items.map((item) => (
            <tr key={item.id}>
                <td className="align-middle text-center">{item.itemNumber}</td>
                <td className="align-middle text-center">{item.product.name}</td>
                <td className="align-middle text-center">{item.product.price}</td>
                <td className="align-middle text-center">{item.product.productType.name}</td>
                <td className="align-middle text-center">{item.product.productType.taxPercentage}</td>
                <td className="align-middle text-center">{item.soldAmount}</td>
                <td className="align-middle text-center">{item.productValue}</td>
                <td className="align-middle text-center">{item.taxValue}</td>

            </tr>
        )));
    }
    return (
        <Modal show={props.show} onHide={props.onHide} size='xl'>
            <Modal.Header closeButton>
                <Modal.Title>Detalhamento da venda</Modal.Title>
            </Modal.Header>
            <Row className='text-center'>
                <Col>
                    <spam className="font-weight-bold">Número da venda:</spam> {props.sale.id}
                </Col>
                <Col>
                    <spam className="font-weight-bold">Data da venda:</spam> {props.sale.createdAt}
                </Col>
                <Col>
                    <spam className="font-weight-bold">Total da venda:</spam> {props.sale.totalProductValue}
                </Col>
                <Col>
                    <spam className="font-weight-bold">Total de impostos:</spam> {props.sale.totalTaxValue}
                </Col>

            </Row>

            <Table striped bordered hover size="lg">
                <thead>
                    <tr>
                        <th>Número do item</th>
                        <th>Produto</th>
                        <th>Preço unitário</th>
                        <th>Tipo do produto</th>
                        <th>Percentual de impostos</th>
                        <th>Quantidade</th>
                        <th>Valor do produto</th>
                        <th>Valor de impostos</th>
                    </tr>
                </thead>
                <tbody>
                    {tableContent}
                </tbody>
            </Table>
        </Modal>
    );
}

export default SaleItems;