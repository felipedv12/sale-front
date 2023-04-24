import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";


const Header = () => {

    const location = useLocation();
    const currentPath = location.pathname;

    return (
        <div>
            <Navbar bg="dark" variant="dark" expand="lg">
                <Container fluid>
                    <Navbar.Brand as={Link} to="/" href="/">Sales Project</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                </Container>
            </Navbar>
            <Nav className="mt-3" variant="tabs" defaultActiveKey={currentPath}>
                <Nav.Item>
                    <Nav.Link as={Link} to="/" href="/">Home</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link as={Link} to="/sales" href="/sales">Vendas</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link as={Link} to="/products" href="/products">Produtos</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link as={Link} to="/product-types" href="/product-types">Tipos de produtos</Nav.Link>
                </Nav.Item>
            </Nav>
        </div>

    );
}

export default Header;