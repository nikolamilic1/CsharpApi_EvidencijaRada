import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate } from 'react-router-dom';
import { RoutesNames } from '../Constants';

export default function NavBarEvidencija() {

    const navigate = useNavigate();

    return(
        <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">Evidencija rada</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link onClick={()=>navigate(RoutesNames.HOME)}>Početna</Nav.Link>
            <Nav.Link href="https://nikolamilic1-001-site1.htempurl.com/swagger/index.html" target='_blank'>Swagger</Nav.Link>
            <NavDropdown title="Programi" id="basic-nav-dropdown">
              <NavDropdown.Item onClick={()=>navigate(RoutesNames.PROJEKT_PREGLED)}>Projekti</NavDropdown.Item>
              <NavDropdown.Item onClick={()=>navigate(RoutesNames.DJELATNIK_PREGLED)}>Djelatnici</NavDropdown.Item>
              <NavDropdown.Item onClick={()=>navigate(RoutesNames.ZADATAK_PREGLED)}>Zadaci</NavDropdown.Item>                           
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    );
    
}