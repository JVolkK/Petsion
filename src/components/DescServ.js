import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "react-bootstrap";
import cama from "../images/cama.jpg";
import compu from "../images/compu.jpg";
import presente from "../images/presente.jpg";
import varios from "../images/varios.jpg";
import "../styles/Servicios.css";
import "../styles/App.css";

function DescServ() {
  return (
    <Container fluid className="p-0">
      <img className="d-block w-100" src={varios} alt="Nuestros servicios" />
      <br />
      <Row className="mx-md-auto">
        <Col xs={12} lg={4}>
          <h2>Alojamiento</h2>
          <img className="d-block w-100" src={cama} alt="alojamiento" />
          <p>
            Cuidado durante las vacaciones o el fin de semana, donde tu mascota
            es atendida en una casa particular por el cuidador que elijas.
            Nuestros cuidadores se aseguran de que tu mascota esté cómoda y
            reciba paseos, juegos y cuidados. Debes traer el alimento para tu
            mascota tú mismo/a durante su estancia. El precio será acordado
            entre las partes.
          </p>
        </Col>
        <Col xs={12} lg={4}>
          <h2>Guardería de día</h2>
          <img className="d-block w-100" src={compu} alt="cuidado de dia" />
          <p>
            El servicio de guardería es durante el día, generalmente desde la
            mañana entre las 8 y las 9, hasta la tarde entre las 15 y las 17,
            pero también puede ser más corto o en otro horario. El cuidador se
            asegurará de que la mascota esté cómoda y reciba paseos, juegos y
            cuidado. Debes traer el alimento para tu mascota de ser necesario
            mientras se le ofrece el cuidado. El precio será acordado entre las
            partes
          </p>
        </Col>
        <Col xs={12} lg={4}>
          <h2>Paseos</h2>
          <img className="d-block w-100" src={presente} alt="paseo" />
          <p>
            ¿No puedes pasear a tu perro tan a menudo como te gustaría?
            ¡Encuentra un paseador de perros que lo saque a pasear tanto y tan
            lejos como sea necesario! Ofrecemos paseos de 30 a 60 minutos para
            tu perro, que incluyen cobertura veterinaria, así como servicio de
            recogida y entrega en tu hogar.
          </p>
        </Col>
      </Row>
    </Container>
  );
}

export default DescServ;
