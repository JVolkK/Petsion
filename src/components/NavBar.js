import React, {useContext} from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import PETSION from '../images/PETSION.png';
import { Link } from 'react-router-dom';
import { AppContext } from '../contexts/AppContext';

const NavBar = () => {
  const {isAuthenticated} = useContext(AppContext);
  // const handleLogout = () => {
  //   // Limpiar el token de autenticación y actualizar el estado
  //   localStorage.removeItem('authToken');
  //   setAuthenticated(false); // Actualizar el estado de autenticación a falso
  // };

  return (
    <Navbar bg="body-tertiary" expand="lg" className="p-0 fixed-top">
      <Container fluid>
        <Navbar.Brand as={Link} to="/">
          <img src={PETSION} alt="logo" width="180" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarSupportedContent" />
        <Navbar.Collapse id="navbarSupportedContent">
          <Nav className="ms-auto mb-2 mb-lg-0">
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
            {isAuthenticated ? (
              <Nav.Item>
                <Nav.Link as={Link} to="/mi-perfil"> {/* Enlace actualizado */}
                 Mi Perfil 
                </Nav.Link>
              </Nav.Item>
            ) : (
              <>
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
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;