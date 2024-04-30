import Container from "react-bootstrap/Container";

import "../styles/HomeForm.css";
import { Link } from "react-router-dom";

function Footer() {
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
                <Link class="nav-link text-white" to="/">
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
                <Link class="nav-link text-white" to="/">
                  Contacto
                </Link>
              </nav>
            </div>
            <div className="p-2 flex-fill">
              <Link className="p-2 flex-fill" to="/">
                Contacto
              </Link>
            </div>
            <nav class="nav flex-column ">
              <Link class="nav-link text-white" to="/">
                TERMINOS Y CONDICIONES
              </Link>
              <Link class="nav-link text-white" to="/">
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
    </>
  );
}

export default Footer;
