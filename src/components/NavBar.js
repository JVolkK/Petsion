
import Container from "react-bootstrap/Container";
import PETSION from "../images/PETSION.png";

function NavBar() {
  return (
    <>
      <Container >
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container">
          <a className="navbar-brand" href="#">
            <img src={PETSION} alt="logo" width="180"/>
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0"> {/* Alineación a la derecha */}
              <li className="nav-item">
                <a className="nav-link" href="#">Buscar Cuidador</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Servicios</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Iniciar Sesión</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Registrarse</a>
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
