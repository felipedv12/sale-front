import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { API_URL } from '../../../constants/api';
import Alert from '../../common/Alert';

class ProductForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: props.product.id || null,
      name: props.product.name || '',
      barcode: props.product.barcode || '',
      description: props.product.description || '',
      price: props.product.price || 0,
      productType: props.product.productType || null,
      taxPercentage: props.product.productType ? props.product.productType.taxPercentage : 0,
      types: [],
      showAlert: false,
      titleAlert: '',
      messageAlert: '',
      typeAlert: '',
      errors: {
        name: { message: '' },
        barcode: { message: '' },
        price: { message: '' },
        productType: { message: '' }
      }
    };
  }

  handleShowAlert = () => {
    this.setState({ showAlert: true });
  }

  handleCloseAlert = () => {
    this.setState({ showAlert: false });
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  };

  handleInputChangeOption = (event) => {
    const { name, value } = event.target;
    if (value) {
      this.setState({
        productType: JSON.parse(value),
        taxPercentage: JSON.parse(value).taxPercentage
      });
    } else {
      this.setState({
        productType: null,
        taxPercentage: 0
      });
    }
  };

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.id === null) {
      this.create();
    } else {
      this.update(this.state.id);
    }
  };

  update = (id) => {
    fetch(API_URL + '/products/' + id, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(this.state)
    })
      .then(res => res.json())
      .then(
        (result) => {
          if (this.validate(result)) {
            this.setState({titleAlert: 'Sucesso', messageAlert: 'Produto alterado com sucesso.', typeAlert: 'alert alert-success',showAlert: true});
            this.props.onSuccess();
          }
        },
        (error) => {
          console.log(error);
          this.setState({titleAlert: 'Erro', messageAlert: 'Tivemos um problema ao alterar o produto, tente novamente.', typeAlert: 'alert alert-danger', showAlert: true});
        }
      );
  }

  create = () => {

    fetch(API_URL + '/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(this.state)
    })
      .then(res => res.json())
      .then(
        (result) => {
          if (this.validate(result)) {
            this.props.onSuccess();
            this.setState({titleAlert: 'Sucesso', messageAlert: 'Produto cadastrado com sucesso.', typeAlert: 'alert alert-success', showAlert: true});
          }
        },
        (error) => {
          console.log(error);
          this.setState({titleAlert: 'Erro', messageAlert: 'Tivemos um problema ao cadastrar o produto, tente novamente.', typeAlert: 'alert alert-danger', showAlert: true});
        }
      );

  }

  componentDidMount = () => {
    fetch(API_URL + '/product-types')
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({types: result.data});
        },
        (error) => {
          console.log(error);
        }
      );
  }


  validate = (result) => {
    let fieldMap = {
      name: 'name',
      barcode: 'barcode',
      price: 'price',
      productType: 'productType',
    };

    if (result.errors) {
      const newErrors = {};
      Object.keys(fieldMap).forEach((field) => {
        if (result.errors[field]) {
          newErrors[fieldMap[field]] = result.errors[field];
        } else {
          newErrors[fieldMap[field]] = { message: '' };
        }
      });
      this.setState({ errors: newErrors });
      return false;
    }
    return true;
  };

  render() {
    const { show, onHide, title } = this.props;
    return (
      <Modal show={show} onHide={onHide}>

        <Alert
          show={this.state.showAlert}
          handleClose={this.handleCloseAlert}
          title={this.state.titleAlert}
          message={this.state.messageAlert}
          type={this.state.typeAlert}
        />
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group className="mt-3" controlId="formName">
              <Form.Label>Nome<span style={{ color: 'red' }}>*</span></Form.Label>
              <Form.Control type="text" name="name" value={this.state.name} onChange={this.handleInputChange} />
              {this.state.errors.name.message && (
                <span style={{ color: 'red' }}>{this.state.errors.name.message}</span>
              )}
            </Form.Group>
            <Form.Group className="mt-3" controlId="formBarcode">
              <Form.Label>Código de barras<span style={{ color: 'red' }}>*</span></Form.Label>
              <Form.Control type="text" name="barcode" value={this.state.barcode} onChange={this.handleInputChange} />
              {this.state.errors.barcode !== 'undefined' && (
                <span style={{ color: 'red' }}>{this.state.errors.barcode.message}</span>
              )}
            </Form.Group>
            <Form.Group className="mt-3" controlId="formDescription">
              <Form.Label>Descrição</Form.Label>
              <Form.Control as="textarea" name="description" value={this.state.description} onChange={this.handleInputChange} />
            </Form.Group>
            <Form.Group className="mt-3" controlId="formPrice">
              <Form.Label>Preço<span style={{ color: 'red' }}>*</span></Form.Label>
              <Form.Control type="number" name="price" value={this.state.price} onChange={this.handleInputChange} />
              {this.state.errors.price.message && (
                <span style={{ color: 'red' }}>{this.state.errors.price.message}</span>
              )}
            </Form.Group>
            <Form.Group className="mt-3" controlId="formProductType">
              <Form.Label>Tipo de produto<span style={{ color: 'red' }}>*</span></Form.Label>
              <Form.Control as="select" name="productType" value={JSON.stringify(this.state.productType)} onChange={this.handleInputChangeOption} >
                <option value="">Selecione...</option>
                {
                  this.state.types.map((option) => (
                    <option key={option.id} value={JSON.stringify(option)}>
                      {option.name}
                    </option>
                  )
                  )
                }

              </Form.Control>
              {this.state.errors.productType.message && (
                <span style={{ color: 'red' }}>{this.state.errors.productType.message}</span>
              )}
            </Form.Group>
            <Form.Group className='mt-3' controlId='formProductTypePercentageTax'>
              <Form.Label>Percentual de impostos</Form.Label>
              <Form.Control type='number' name='productTypeTaxPercentage' value={this.state.taxPercentage} disabled />
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
