import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Col, Row } from "react-bootstrap";
import { FaDog, FaCat } from "react-icons/fa";
import { GiRabbit } from "react-icons/gi";
// import { MdDelete } from "react-icons/md";
// import axios from "axios";

const CardMascotaReserva = ({ nombre, tipoMascota, id, setLoading }) => {
  // const borrarMascota = () => {
  //   try {
  //     setLoading(true);
  //     axios.post("https://api-petsion.onrender.com/mascota/eliminar", {
  //       id: id,
  //     });
  //   } catch (error) {
  //     alert("Error al borrar mascota.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <>
      <Container className="d-flex justify-content-center text-center w-auto">
        <Row className="d-flex justify-content-center align-items-center">
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
          {/* <Button onClick={borrarMascota} className="w-auto">
            <MdDelete size={20} />
          </Button> */}
        </Row>
      </Container>
    </>
  );
};

export default CardMascotaReserva;
