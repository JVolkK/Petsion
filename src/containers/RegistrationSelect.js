import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../styles/registrationSelectStyle.css";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";

const Registration = () => {
  return (
    <>
      <NavBar />
      <Container className="registrationSelectStyle d-flex flex-column justify-content-center align-items-center">
        <p className="d-flex justify-content-center textTitle ">
          Como quieres registrarte?
        </p>
        <Container className=" d-flex justify-content-center align-items-center">
          <Row>
            <Col>
              <Link to="/registration-duenio">
                <Button size="lg" className="buttonStyle">
                  Dueño
                </Button>{" "}
              </Link>
            </Col>
            <Col>
              <Link to="/">
                <Button size="lg" className="buttonStyle">
                  Anfitrion
                </Button>{" "}
              </Link>
            </Col>
          </Row>
        </Container>
      </Container>
      <Footer />
    </>
  );
};

export default Registration;
