import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { API_URL } from '../../../constants/api';
import Alert from '../../common/Alert';

class ProductTypeForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: props.productType.id || null,
      name: props.productType.name || '',
      taxPercentage: props.productType.taxPercentage || 0,
      showAlert: false,
      titleAlert: '',
      messageAlert: '',
      typeAlert: '',
      errors: {
        name: { message: '' },
        taxPercentage: { message: '' }
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


  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.id === null) {
      this.create();
    } else {
      this.update(this.state.id);
    }
  };

  update = (id) => {
    fetch(API_URL + '/product-types/' + id, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(this.state)
    })
      .then(res => res.json())
      .then(
        (result) => {
          if (this.validate(result)) {
            this.setState({titleAlert: 'Sucesso', messageAlert: 'Tipo de produto alterado com sucesso.', typeAlert: 'alert alert-success',showAlert: true});
            this.props.onSuccess();
          }
        },
        (error) => {
          console.log(error);
          this.setState({titleAlert: 'Erro', messageAlert: 'Tivemos um problema ao alterar o tipo de produto, tente novamente.', typeAlert: 'alert alert-danger', showAlert: true});
        }
      );
  }

  create = () => {

    fetch(API_URL + '/product-types', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(this.state)
    })
      .then(res => res.json())
      .then(
        (result) => {
          if (this.validate(result)) {
            this.props.onSuccess();
            this.setState({titleAlert: 'Sucesso', messageAlert: 'Tipo de produto cadastrado com sucesso.', typeAlert: 'alert alert-success', showAlert: true});
          }
        },
        (error) => {
          console.log(error);
          this.setState({titleAlert: 'Erro', messageAlert: 'Tivemos um problema ao cadastrar o tipo de produto, tente novamente.', typeAlert: 'alert alert-danger', showAlert: true});
        }
      );

  }

  validate = (result) => {
    let fieldMap = {
      name: 'name',
      taxPercentage: 'taxPercentage'
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
            <Form.Group className='mt-3' controlId='formPercentageTax'>
              <Form.Label>Percentual de impostos<span style={{ color: 'red' }}>*</span></Form.Label>
              <Form.Control type='number' name='taxPercentage' value={this.state.taxPercentage} onChange={this.handleInputChange} />
              {this.state.errors.taxPercentage.message && (
                <span style={{ color: 'red' }}>{this.state.errors.taxPercentage.message}</span>
              )}
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

export default ProductTypeForm;
