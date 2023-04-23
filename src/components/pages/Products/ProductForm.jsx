import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { API_URL } from '../../../constants/api';


class ProductForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: props.product.id || null,
      name: props.product.name || '',
      barcode: props.product.barcode || '',
      description: props.product.description || '',
      price: props.product.price || '',
      productType: props.product.productType || null,
      data: []
    };
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  };

  handleInputChangeOption = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: JSON.parse(value),
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    // Aqui você pode fazer a chamada para a API para salvar o produto
    console.log('Produto salvo:', this.state);

    // Fecha o modal
    this.props.onHide();
  };

  componentDidMount = () => {
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
    const { show, onHide, title } = this.props;
    console.log(this.state);
    return (
      <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={() => this.handleSubmit}>
            <Form.Group className="mt-3" controlId="formName">
              <Form.Label>Nome</Form.Label>
              <Form.Control type="text" name="name" value={this.state.name} onChange={this.handleInputChange} />
            </Form.Group>
            <Form.Group className="mt-3" controlId="formBarcode">
              <Form.Label>Código de barras</Form.Label>
              <Form.Control type="text" name="barcode" value={this.state.barcode} onChange={this.handleInputChange} />
            </Form.Group>
            <Form.Group className="mt-3" controlId="formDescription">
              <Form.Label>Descrição</Form.Label>
              <Form.Control as="textarea" name="description" value={this.state.description} onChange={this.handleInputChange} />
            </Form.Group>
            <Form.Group className="mt-3" controlId="formPrice">
              <Form.Label>Preço</Form.Label>
              <Form.Control type="number" name="price" value={this.state.price} onChange={this.handleInputChange} />
            </Form.Group>
            <Form.Group className="mt-3" controlId="formProductType">
              <Form.Label>Tipo de produto</Form.Label>
              <Form.Control as="select" name="productType" value={JSON.stringify(this.state.productType)} onChange={this.handleInputChangeOption} >
                <option value="">Selecione...</option>
                {
                  this.state.data.map((option) => (
                    <option key={option.id} value={JSON.stringify(option)}>
                      {option.name}
                    </option>
                  )
                  )
                }
              </Form.Control>
            </Form.Group>
            <Form.Group className='mt-3' controlId='formProductTypePercentageTax'>
              <Form.Label>Percentual de impostos</Form.Label>
              <Form.Control type='number' name='productTypeTaxPercentage' value={this.state.productType.taxPercentage} disabled/>
            </Form.Group>
            <Button className="mt-3" variant="primary" type="submit">
              Salvar
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }
}

export default ProductForm;
