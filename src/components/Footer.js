import React, { useState } from 'react';
import Container from "react-bootstrap/Container";
import { Link } from 'react-router-dom';
import Terminos from './Terminos'; 
import Politicas from './Politicas'; 

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
                <a class="nav-link text-white" href="/">
                  <b>PETSION</b>
                </a>
                <a class="nav-link text-white" href="/">
                  Servicios
                </a>
                <a class="nav-link text-white" href="/">
                  ¿Cómo Funciona?
                </a>
                <a class="nav-link text-white" href="/">
                  Sobre Nosotros
                </a>
                <a class="nav-link text-white" href="/">
                  Tarifas
                </a>
                <a class="nav-link text-white" href="/">
                  Hazte Cuidador
                </a>
                <a class="nav-link text-white" href="/">
                  Contacto
                </a>
              </nav>
            </div>
            <div className="p-2 flex-fill">
              <b>REDES SOCIALES</b>
            </div>
            
            <nav className="nav flex-column ">
              {/* Enlace para mostrar el modal de términos */}
              <a className="nav-link text-white" onClick={handleShowTerminos} style={{ cursor: 'pointer' }}>
                TERMINOS Y CONDICIONES
              </a>
              {/* Enlace para mostrar el modal de políticas */}
              <a className="nav-link text-white" onClick={handleShowPoliticas} style={{ cursor: 'pointer' }}>
                POLITICAS DE PRIVACIDAD
              </a>
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