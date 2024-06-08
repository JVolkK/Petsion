import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, ListGroup } from "react-bootstrap";
import { FaDog, FaCat } from "react-icons/fa";
import { GiRabbit } from "react-icons/gi";

const CardMascotaPerfilDuenio = ({ nombre, tipoMascota, edad, peso }) => {
  return (
    <>
      <Card>
        {tipoMascota === "Perro" ? (
          <div className="d-flex justify-content-center">
            <FaDog size={100} />
          </div>
        ) : tipoMascota === "Gato" ? (
          <div className="d-flex justify-content-center">
            <FaCat size={100} />
          </div>
        ) : tipoMascota === "Otros" ? (
          <div className="d-flex justify-content-center">
            <GiRabbit size={100} />
          </div>
        ) : null}
        <Card.Body>
          <Card.Title>{nombre}</Card.Title>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroup.Item>{tipoMascota}</ListGroup.Item>
          <ListGroup.Item>{edad} años</ListGroup.Item>
          <ListGroup.Item>{peso}kg</ListGroup.Item>
        </ListGroup>
      </Card>
    </>
  );
};

export default CardMascotaPerfilDuenio;
