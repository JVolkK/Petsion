import React from "react";
import { Container, Col, Row } from "react-bootstrap";
import { FaDog, FaCat } from "react-icons/fa";
import { GiRabbit } from "react-icons/gi";

const CardMascotaReserva = ({ nombre, tipoMascota, edad, peso }) => {
  return (
    <>
      <Container className="d-flex">
        <Row>
          <h4>{nombre}</h4>
          {tipoMascota === "Perro" ? (
            <Col className="d-flex justify-content-center align-items-center">
              <FaDog size={100} />
            </Col>
          ) : tipoMascota === "Gato" ? (
            <Col className="d-flex justify-content-center align-items-center">
              <FaCat size={100} />
            </Col>
          ) : tipoMascota === "Otros" ? (
            <Col className="d-flex justify-content-center align-items-center">
              <GiRabbit size={100} />
            </Col>
          ) : null}
          <Col>
            {/* <ListGroup className="list-group-flush">
              <ListGroup.Item>{tipoMascota}</ListGroup.Item>
              <ListGroup.Item>{edad} años</ListGroup.Item>
              <ListGroup.Item>{peso}kg</ListGroup.Item>
            </ListGroup> */}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default CardMascotaReserva;
