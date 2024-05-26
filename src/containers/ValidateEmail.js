import React from "react";
import "../styles/ValidateEmail.css";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import image from "../images/email.png";

const ValidateEmail = () => {
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
                Verifica tu correo
              </Card.Title>
              <Card.Text>
                Te hemos enviado un link a tu correo para que valides tu
                registro.
              </Card.Text>
              <Row className=" justify-content-center d-flex">
                <Button as={Link} variant="primary" to="/" className="w-50">
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

export default ValidateEmail;
