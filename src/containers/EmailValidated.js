import React from "react";
import "../styles/ValidateEmail.css";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import image from "../images/checked.png";

const EmailValidated = () => {
  return (
    <div className="background vh-100 justify-content-center d-flex  p-5  align-items-center">
      <Row>
        <Col xl={12} className="w-100">
          <Card style={{ width: "18rem" }} className="w-100 pt-3">
            <Row className="justify-content-center align-items-center">
              <img src={image} className="w-25 " alt="imagen" />
            </Row>

            <Card.Body className="justify-content-center d-flex flex-column">
              <Card.Title className="justify-content-center d-flex">
                Registrado con exito
              </Card.Title>
              <Card.Text>
                Tu cuenta ha sido registrada ya puedes iniciar sesion en nuestra
                pagina, pulsa debajo para ir al inicio.
              </Card.Text>
              <Row className=" justify-content-center d-flex">
                <Button as={Link} variant="success" to="/" className="w-50">
                  Volver al inicio
                </Button>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default EmailValidated;
