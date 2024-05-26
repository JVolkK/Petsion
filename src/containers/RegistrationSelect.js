import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import "../styles/registrationSelectStyle.css";
import NavBar from "../components/NavBar";

const RegistrationSelect = () => {
  return (
    <>
      <section className="vh-100">
        <NavBar />
        <Container fluid>
          <Row>
            <Col sm={6} className="px-0 d-none d-sm-block">
              <div className="LoginImagen backgroundImage" />
            </Col>
            <Col
              sm={6}
              className="text-black align-items-center justify-content-center d-flex"
            >
              <div className="d-flex flex-column justify-content-center align-items-center pb-5 pt-5">
                <h3
                  className="fw-normal mb-3 pb-3"
                  style={{ letterSpacing: "1px" }}
                >
                  ¿Cómo quieres registrarte?
                </h3>
                <Container className="d-flex justify-content-center align-items-center">
                  <Row>
                    <Col>
                      <Link to="/registration-duenio">
                        <Button
                          variant="info"
                          size="lg"
                          block
                          className="buttonStyle"
                        >
                          <span>Dueño</span>
                        </Button>
                      </Link>
                    </Col>
                    <Col>
                      <Link to="/registration-anfitrion">
                        <Button
                          variant="info"
                          size="lg"
                          block
                          className="buttonStyle"
                        >
                          <span>Anfitrión</span>
                        </Button>
                      </Link>
                    </Col>
                  </Row>
                </Container>
              </div>
            </Col>
          </Row>
        </Container>
        <Footer />
      </section>
    </>
  );
};

export default RegistrationSelect;
