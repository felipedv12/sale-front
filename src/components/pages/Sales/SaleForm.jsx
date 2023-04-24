import React, { useState } from 'react';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead';
import { useForm, useFieldArray } from 'react-hook-form';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { API_URL } from '../../../constants/api';



function SaleForm(props) {
    const [inputs, setInputs] = useState([{ product: { productType: { taxPercentage: 0 }, price: 0 }, soldAmount: '', productValue: 0, taxValue: 0}]);
    const defaultOption = { productType: { taxPercentage: 0 }, price: 0 };
    const [totalProductValue, setTotalProductValue] = useState(0);
    const [totalTaxValue, setTotalTaxValue] = useState(0);

    const handleInputChange = (index, event) => {
        const values = [...inputs];
        const target = event.target;

        if (target.name === "product") {

            const product = JSON.parse(target.value);
            console.log(product);
            values[index].product = product;
            values[index].productValue = (values[index].soldAmount ? values[index].soldAmount : 0) * product.price;
            values[index].taxValue = values[index].productValue * product.productType.taxPercentage / 100;
        }
        if (target.name === 'soldAmount') {
            values[index].soldAmount = Number(target.value);
            values[index].productValue = (values[index].soldAmount ? values[index].soldAmount : 0) * values[index].product.price;
            values[index].taxValue = values[index].productValue * values[index].product.productType.taxPercentage / 100;
        }
        setInputs(values);
        handleCalculateTotals();
    };

    const handleAddInput = () => {
        const values = [...inputs];
        values.push({ product: { productType: { taxPercentage: 0 }, price: 0 }, soldAmount: '', productValue: 0, taxValue: 0 });
        setInputs(values);
        handleCalculateTotals();
    };

    const handleRemoveInput = (index) => {
        const values = [...inputs];
        values.splice(index, 1);
        setInputs(values);
        handleCalculateTotals();
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        create();
    };


    const create = () => {
        fetch(API_URL + '/sales', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(inputs)
          })
            .then(res => res.json())
            .then(
              (result) => {
                  props.onSuccess();
              },
              (error) => {
                console.log(error);
              }
            );
    }

    const handleCalculateTotals = () => {
        setTotalProductValue(0);
        setTotalTaxValue(0);
        let tax = 0;
        let product = 0;
        inputs.map((item) => {
            tax += Number(item.taxValue);
            product += Number(item.productValue);
        });

        setTotalProductValue(product.toFixed(2));
        setTotalTaxValue(tax.toFixed(2));
    }

    return (
        <Modal show={props.show} onHide={props.onHide} size='xl'>
            <Modal.Header closeButton>
                <Modal.Title>Realizar venda</Modal.Title>
            </Modal.Header>


            <Form className='m-2' onSubmit={handleSubmit}>
                <Row className='m2'>
                    <Col>
                        <Form.Group className='mt-2'>
                            <Form.Label>Valor total da venda</Form.Label>
                            <Form.Control
                                type="number"
                                name="price"
                                value={totalProductValue}
                                disabled
                            />
                        </Form.Group >
                    </Col>
                    <Col>
                        <Form.Group className='mt-2'>
                            <Form.Label>Valor total de impostos</Form.Label>
                            <Form.Control
                                type="number"
                                name="price"
                                value={totalTaxValue}
                                disabled
                            />
                        </Form.Group >
                    </Col>
                </Row>
                <hr></hr>
                {inputs.map((input, index) => (
                    <Row key={index}>
                        <Row>
                            <Col>
                                <Form.Group className='mt-2'>
                                    <Form.Label>Produto</Form.Label>

                                    <Form.Control as="select" name="product" value={JSON.stringify(input.product)} onChange={(event) => handleInputChange(index, event)} >
                                        <option value={JSON.stringify(defaultOption)}>Selecione um produto</option>
                                        {
                                            props.products.map((option) => (
                                                <option key={option.id} value={JSON.stringify(option)}>
                                                    {option.name}
                                                </option>
                                            )
                                            )
                                        }
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className='mt-2'>
                                    <Form.Label>Quantidade vendida</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="soldAmount"
                                        value={input.soldAmount}

                                        onChange={(event) => handleInputChange(index, event)}
                                    />
                                </Form.Group >
                            </Col>
                            <Col>
                                <Form.Group className='mt-2'>
                                    <Form.Label>Preço unitário do produto</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="price"
                                        value={input.product.price}
                                        disabled
                                    />
                                </Form.Group >
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group className='mt-2'>
                                    <Form.Label>Percentual de imposto do produto</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="taxPercentage"
                                        value={input.product.productType.taxPercentage}
                                        disabled
                                    />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className='mt-2'>
                                    <Form.Label>Valor total do produto</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="productValue"
                                        value={input.productValue}
                                        disabled
                                    />
                                </Form.Group >
                            </Col>
                            <Col>
                                <Form.Group className='mt-2'>
                                    <Form.Label>Valor de imposto do produto</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="taxValue"
                                        value={input.taxValue}
                                        disabled
                                    />
                                </Form.Group >
                            </Col>
                        </Row>

                        <Form.Group className='mt-2'>
                            <Button variant="danger" onClick={() => handleRemoveInput(index)}>
                                -
                            </Button>
                        </Form.Group>

                    </Row>
                ))}
                <Button className='mt-2 mr-2' variant="success" onClick={handleAddInput}>
                    +
                </Button>
                <Button className='mt-2' variant="primary" type="submit">
                    Salvar
                </Button>
            </Form>
        </Modal>
    );
}

export default SaleForm;