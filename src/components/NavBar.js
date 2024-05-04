import Container from "react-bootstrap/Container";
import PETSION from "../images/PETSION.png";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <>
      <Container fluid className="p-0">
        <nav className="navbar navbar-expand-lg bg-body-tertiary p-0">
          <div className="container">
            <Link className="navbar-brand" to="/">
              <img src={PETSION} alt="logo" width="180" />
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                {/* Alineación a la derecha */}
                <li className="nav-item">
                  <Link className="nav-link" to="/buscar-cuidador">
                    Buscar cuidador
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/">
                    Servicios
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Iniciar Sesión
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/registration-select">
                    Registrarse
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </Container>
    </>
  );
}

export default NavBar;
