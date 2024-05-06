import NavBar from "../components/NavBar";
import React from "react";
import { Link } from "react-router-dom";
import "../styles/login.css";
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

const LoginPage = () => {
  return (
    <>
      <section className="vh-100">
        <Container fluid>
          <Row>
          <NavBar /> {/* Agrega el NavBar aquí */}
            <Col sm={6} className="text-black">
              <div className="px-5 ms-xl-4">
                <i className="fas fa-crow fa-2x me-3 pt-5 mt-xl-4" style={{ color: '#709085' }}></i>
                <span className="h1 fw-bold mb-0"></span>
              </div>
              <div className="d-flex align-items-center h-custom-0 px-5 ms-xl-4 mt-5 pt-5 pt-xl-0 mt-xl-n5">
                <Form style={{ width: '23rem' }}>
                  <h3 className="fw-normal mb-3 pb-3" style={{ letterSpacing: '1px' }}>Iniciar Sesión</h3>
                  <Form.Group className="mb-4" controlId="formBasicEmail">
                    <Form.Control type="email" placeholder="Correo electrónico" size="lg" />
                  </Form.Group>
                  <Form.Group className="mb-4" controlId="formBasicPassword">
                    <Form.Control type="password" placeholder="Contraseña" size="lg" />
                  </Form.Group>
                  <div className="pt-1 mb-4">
                    <Button variant="info" size="lg" block>Iniciar sesión</Button>
                  </div>
                  <p className="small mb-5 pb-lg-2"><a className="text-muted" href="#!">Olvidaste tu contraseña?</a></p>
                  <p>No tenes cuenta? <a href="#!" className="link-info">Regístrate</a></p>
                </Form>
              </div>
            </Col>
            <Col sm={6} className="px-0 d-none d-sm-block">
                <div className="LoginImagen backgroundImage" />
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default LoginPage;
