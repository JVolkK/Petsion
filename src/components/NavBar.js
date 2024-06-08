import React, { useContext, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Nav, Container } from "react-bootstrap";
import PETSION from "../images/PETSION.png";
import { Link } from "react-router-dom";
import { AppContext } from "../contexts/AppContext";

const NavBar = () => {
  const { usuarioLogeado, setAuthenticated, setUsuarioLogeado } =
    useContext(AppContext);

  useEffect(() => {
    // Ajusta el padding-top del cuerpo para evitar que el contenido quede oculto detrás del Navbar
    document.body.style.paddingTop = "70px"; // Ajusta este valor según la altura de tu Navbar
    // Limpia el padding-top al desmontar el componente
    return () => {
      document.body.style.paddingTop = null;
    };
  }, []);

  useEffect(() => {
    const authLocal = JSON.parse(localStorage.getItem("isAuthenticated"));
    setAuthenticated(authLocal);

    const usuarioLocal = JSON.parse(localStorage.getItem("usuarioLogeado"));
    setUsuarioLogeado(usuarioLocal);
  }, [setAuthenticated, setUsuarioLogeado]);

  return (
    <Navbar bg="body-tertiary" expand="lg" className="p-0 fixed-top">
      <Container fluid>
        <Navbar.Brand as={Link} to="/">
          <img src={PETSION} alt="logo" width="180" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarSupportedContent" />
        <Navbar.Collapse id="navbarSupportedContent">
          <Nav className="ms-auto mb-2 mb-lg-0">
            {usuarioLogeado.rol === "user" || usuarioLogeado.rol === "guest" ? (
              <Nav.Item>
                <Nav.Link as={Link} to="/buscar-cuidador">
                  Buscar cuidador
                </Nav.Link>
              </Nav.Item>
            ) : null}
            <Nav.Item>
              <Nav.Link as={Link} to="/servicios-select">
                Servicios
              </Nav.Link>
            </Nav.Item>
            {usuarioLogeado.rol === "user" ? (
              <>
                <Nav.Item>
                  <Nav.Link as={Link} to="/reservas-duenio">
                    Mis reservas
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link as={Link} to="/perfil-duenio">
                    Mi Perfil
                  </Nav.Link>
                </Nav.Item>
              </>
            ) : usuarioLogeado.rol === "anfitrion" ? (
              <>
                <Nav.Item>
                  <Nav.Link as={Link} to="/reservas-anfitrion">
                    Mis reservas
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link as={Link} to="/mi-perfil">
                    Mi Perfil
                  </Nav.Link>
                </Nav.Item>
              </>
            ) : usuarioLogeado.rol === "guest" ? (
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
            ) : null}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
