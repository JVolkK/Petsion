
import Container from "react-bootstrap/Container";

import "../styles/HomeForm.css";

function Footer() {
  return (
    <>
    <Container>
    <footer className="footer mt-auto py-3 bg-custom-color">
        <div className="d-flex text-white">
        <div className="p-2 flex-fill ">
        <nav class="nav flex-column ">
            <a class="nav-link text-white" href="#"><b>PETSION</b></a>
            <a class="nav-link text-white" href="#">Servicios</a>
            <a class="nav-link text-white" href="#">¿Cómo Funciona?</a>
            <a class="nav-link text-white" href="#">Sobre Nosotros</a>
            <a class="nav-link text-white" href="#">Tarifas</a>
            <a class="nav-link text-white" href="#">Hazte Cuidador</a>
            <a class="nav-link text-white" href="#">Contacto</a>
        </nav>
        </div>
        <div className="p-2 flex-fill"><b>REDES SOCIALES</b></div>
        <nav class="nav flex-column ">
            <a class="nav-link text-white" href="#">TERMINOS Y CONDICIONES</a>
            <a class="nav-link text-white" href="#">POLITICAS DE PRIVACIDAD</a>
        </nav>
        </div> 
        <hr style={{ borderTop: '1px solid white', margin: '10px auto' }} />
        <div className="text-center text-white">
        <span>© 2024 PETSION. Todos los derechos reservados.</span>
        </div>
    </footer>
    </Container>

    </>
  );
}

export default Footer;

