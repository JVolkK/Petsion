import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "react-bootstrap";
import zona from "../images/zona.png";
import reserv from "../images/reserv.png";
import relax from "../images/relax.png";
import Image from "react-bootstrap/Image";
import "../styles/comofunciona.css";
import "../styles/App.css";

function ComoFunciona() {
  return (
    <Container fluid className="p-0">
      <Container className="p-auto m-auto">
        <h1 style={{ textAlign: "center" }} className="pt-3">
          Como funciona Petsion
        </h1>
        <Row>
          <Col xs={12} sm={6}>
            <Row>
              <Col
                md={6}
                className="d-flex align-items-center justify-content-center"
              >
                <Image
                  src={zona}
                  fluid
                  width={250}
                  height={250}
                  className="img-fluid"
                />
              </Col>
              <Col md={6} className="d-flex align-items-center">
                <div className="text-center">
                  <h3 className="mb-0">Busca cuidadores en tu zona</h3>
                  <p className="mb-0">
                    Introduce tu dirección o código postal para encontrar
                    cuidadores en tu zona
                  </p>
                </div>
              </Col>
            </Row>
          </Col>
          <Col xs={12} sm={6}>
            <Row>
              <Col
                md={6}
                className="d-flex align-items-center justify-content-center"
              >
                <Image
                  src={reserv}
                  fluid
                  width={250}
                  height={250}
                  className="img-fluid"
                />
              </Col>
              <Col md={6} className="d-flex align-items-center">
                <div className="text-center">
                  <h3 className="mb-0">Reserva</h3>
                  <p className="mb-0">
                    Ponte en contacto con el cuidadores que prefieras y haz tu
                    reserva
                  </p>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>

        <Row className="justify-content-center">
          <Col
            xs={12}
            sm={6}
            className="d-flex align-items-center justify-content-center"
          >
            <Row>
              <Col
                md={6}
                className="d-flex align-items-center justify-content-center"
              >
                <Image
                  src={relax}
                  fluid
                  width={250}
                  height={250}
                  className="img-fluid"
                />
              </Col>
              <Col md={6} className="d-flex align-items-center">
                <div className="text-center">
                  <h3 className="mb-0">Relájate</h3>
                  <p className="mb-0">
                    Tu mascota quedará en buenas manos mientras tú disfrutas de
                    tus vacaciones
                  </p>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default ComoFunciona;
