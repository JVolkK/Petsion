import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import PETSION from "../images/PETSION.png";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <>
      <Navbar bg="body-tertiary" expand="lg" className="p-0">
        <Container fluid>
          <Navbar.Brand as={Link} to="/">
            <img src={PETSION} alt="logo" width="180" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarSupportedContent" />
          <Navbar.Collapse id="navbarSupportedContent">
            <Nav className="ms-auto mb-2 mb-lg-0">
              {/* Alineación a la derecha */}
              <Nav.Item>
                <Nav.Link as={Link} to="/buscar-cuidador">
                  Buscar cuidador
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link as={Link} to="/servicios-select">
                  Servicios
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link as={Link} to="/login">
                  Iniciar Sesión
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link as={Link} to="/registration-select">
                  Registrarse
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default NavBar;
