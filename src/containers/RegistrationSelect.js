import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import '../styles/registrationSelectStyle.css';
import NavBar from '../components/NavBar';

const RegistrationSelect = () => {
  return (
    <>
      <section className="vh-100">
        <NavBar/>
        <Container fluid>
          <Row>
            <Col sm={6} className="px-0 d-none d-sm-block">
              <div className="LoginImagen backgroundImage" />
            </Col>
            <Col sm={6} className="text-black">
              <div className="px-5 ms-xl-4">
                <i className="fas fa-crow fa-2x me-3 pt-5 mt-xl-4" style={{ color: '#709085' }}></i>
                <span className="h1 fw-bold mb-0"></span>
              </div>
              <div className="d-flex flex-column justify-content-center align-items-center h-custom-0 px-5 ms-xl-4 mt-5 pt-5 pt-xl-0 mt-xl-n5">
                <h3 className="fw-normal mb-3 pb-3" style={{ letterSpacing: '1px' }}>¿Cómo quieres registrarte?</h3>
                <Container className="d-flex justify-content-center align-items-center">
                  <Row>
                    <Col>
                      <Link to="/registration-duenio">
                        <Button variant="info" size="lg" block className="buttonStyle">
                          <span>Dueño</span>
                        </Button>
                      </Link>
                    </Col>
                    <Col>
                      <Link to="/registration-anfitrion">
                        <Button variant="info" size="lg" block className="buttonStyle">
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
