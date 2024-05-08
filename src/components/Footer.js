import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import Terminos from "./Terminos";
import Politicas from "./Politicas";
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
      <Container fluid className="p-0">
        <footer className="footer mt-auto py-3 bg-custom-color">
          <div className="d-flex text-white">
            <div className="p-2 flex-fill ">
              <nav class="nav flex-column ">
                <Link class="nav-link text-white" to="/">
                  <b>PETSION</b>
                </Link>
                <Link class="nav-link text-white" to="/servicios-select">
                  Servicios
                </Link>
                <Link class="nav-link text-white" to="/">
                  ¿Como funciona?
                </Link>
                <Link class="nav-link text-white" to="/">
                  Sobre Nosotros
                </Link>
                <Link class="nav-link text-white" to="/">
                  Tarifas
                </Link>
                <Link class="nav-link text-white" to="/">
                  Hazte cuidador
                </Link>
                <Link class="nav-link text-white" to="/Contacto">
                  Contacto
                </Link>
              </nav>
            </div>
            <div className="p-2 flex-fill">
              <Link class="nav-link text-white" to="/">
                REDES SOCIALES
              </Link>
              <Link class="nav-link text-white" to="/">
                <b>Contacto</b>
              </Link>
              <Link class="nav-link text-white" to="/">
                Gmail: petsionar@gmail.com
              </Link>
              <Link class="nav-link text-white" to="/">
                Instagram: @petsion
              </Link>
            </div>

            <nav className="nav flex-column ">
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
          </div>
          <hr style={{ borderTop: "1px solid white", margin: "10px auto" }} />
          <div className="text-center text-white">
            <span>© 2024 PETSION. Todos los derechos reservados.</span>
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
