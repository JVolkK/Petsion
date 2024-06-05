import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import Terminos from "./Terminos";
import Politicas from "./Politicas";
import { AiOutlineMail, AiOutlineInstagram } from "react-icons/ai";
import "../styles/HomeForm.css";

function Footer() {
  const [showTerminos, setShowTerminos] = useState(false); // Estado para el modal de términos
  const [showPoliticas, setShowPoliticas] = useState(false); // Estado para el modal de políticas

  const handleCloseTerminos = () => setShowTerminos(false);
  const handleShowTerminos = () => setShowTerminos(true);

  const handleClosePoliticas = () => setShowPoliticas(false);
  const handleShowPoliticas = () => setShowPoliticas(true);

  return (
    <>
      <Container fluid className="p-0 p-auto m-auto">
        <footer className="footer mt-auto py-3 bg-custom-color">
          <Row className="container p-auto m-auto">
            <Col sm={12} md={4}>
              <nav className="nav flex-column">
                <Link className="nav-link text-white" to="/">
                  <b>PETSION</b>
                </Link>
                <Link className="nav-link text-white" to="/servicios-select">
                  Servicios
                </Link>
                <Link className="nav-link text-white" to="/">
                  ¿Como funciona?
                </Link>
                <Link className="nav-link text-white" to="/">
                  Sobre Nosotros
                </Link>
                <Link className="nav-link text-white" to="/">
                  Tarifas
                </Link>
                <Link className="nav-link text-white" to="/">
                  Hazte cuidador
                </Link>
                <Link className="nav-link text-white" to="/Contacto">
                  Contacto
                </Link>
              </nav>
            </Col>
            <Col sm={12} md={4}>
              <nav className="nav flex-column">
                <Link className="nav-link text-white" to="/">
                  <AiOutlineMail className="mr-2" /> petsionar@gmail.com
                </Link>
                <Link className="nav-link text-white" to="/">
                  <AiOutlineInstagram className="mr-2" /> petsion
                </Link>
              </nav>
            </Col>
            <Col sm={12} md={4}>
              <nav className="nav flex-column">
                {/* Enlace para mostrar el modal de términos */}
                <Link
                  className="nav-link text-white"
                  onClick={handleShowTerminos}
                  style={{ cursor: "pointer" }}
                >
                  TERMINOS Y CONDICIONES
                </Link>
                {/* Enlace para mostrar el modal de políticas */}
                <Link
                  className="nav-link text-white"
                  onClick={handleShowPoliticas}
                  style={{ cursor: "pointer" }}
                >
                  POLITICAS DE PRIVACIDAD
                </Link>
              </nav>
            </Col>
          </Row>
          <hr style={{ borderTop: "1px solid white", margin: "10px auto" }} />
          <div className="text-center text-white">
            <span>
              © 2024 PETSION | Todos los derechos reservados | Proyecto con
              fines educativos | UNSTA 2024
            </span>
          </div>
        </footer>
      </Container>

      {/* Renderiza ambos modales y pasa las props */}
      <Terminos show={showTerminos} handleClose={handleCloseTerminos} />
      <Politicas show={showPoliticas} handleClose={handleClosePoliticas} />
    </>
  );
}

export default Footer;
