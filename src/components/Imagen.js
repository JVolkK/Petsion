import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Carousel from "react-bootstrap/Carousel";
import c1 from "../images/c1.jpg";
import c2 from "../images/c2.jpg";
import c3 from "../images/c3.jpg";
import "../styles/carrusel.css"; // Importa el archivo CSS aquí

function Imagen() {
  return (
    <Container fluid className="p-0">
      <Carousel>
        <Carousel.Item>
          <img className="d-block w-100" src={c1} alt="First slide" />
          <Carousel.Caption></Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src={c2} alt="Second slide" />
          <Carousel.Caption></Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src={c3} alt="Third slide" />
          <Carousel.Caption></Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </Container>
  );
}

export default Imagen;
