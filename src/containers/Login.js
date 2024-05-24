import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../styles/login.css';
import { useLogin } from '../hooks/useLogin';
import useLoginState from '../hooks/useLoginState';
import NavBar from "../components/NavBar";

const LoginPage = () => {
  const {
    username,
    setUsername,
    password,
    setPassword,
    userType,
    setUserType,
    error,
    setError,
  } = useLoginState();

  const { handleLogin } = useLogin(username, password, userType, setError);

  return (
    <section className="vh-100">
      <NavBar />
      <Container fluid>
        <Row>
          <Col sm={6} className="text-black">
            <div className="px-5 ms-xl-4">
              <i className="fas fa-crow fa-2x me-3 pt-5 mt-xl-4" style={{ color: '#709085' }}></i>
              <span className="h1 fw-bold mb-0"></span>
            </div>
            <div className="d-flex align-items-center h-custom-0 px-5 ms-xl-4 mt-5 pt-5 pt-xl-0 mt-xl-n5">
              <Form style={{ width: '23rem' }} onSubmit={handleLogin}>
                <h3 className="fw-normal mb-3 pb-3" style={{ letterSpacing: '1px' }}>Iniciar Sesión</h3>

                <Form.Group controlId="formUserTypeGroup">
                  <Form.Label>Seleccionar tipo de cuenta:</Form.Label>
                  <div>
                    <Form.Check
                      type="radio"
                      label="Usuario"
                      name="userType"
                      id="formUserTypeUser"
                      value="usuario"
                      checked={userType === 'usuario'}
                      onChange={(e) => setUserType(e.target.value)}
                    />
                    <Form.Check
                      type="radio"
                      label="Anfitrión"
                      name="userType"
                      id="formUserTypeAnfitrion"
                      value="anfitrion"
                      checked={userType === 'anfitrion'}
                      onChange={(e) => setUserType(e.target.value)}
                    />
                  </div>
                </Form.Group>

                <Form.Group className="mb-4" controlId="formBasicUsername">
                  <Form.Control
                    type="text"
                    placeholder="Nombre de Usuario"
                    size="lg"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </Form.Group>
                
                <Form.Group className="mb-4" controlId="formBasicPassword">
                  <Form.Control
                    type="password"
                    placeholder="Contraseña"
                    size="lg"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>
                
                {error && <p className="text-danger">{error}</p>}
                <div className="pt-1 mb-4">
                  <Button variant="info" size="lg" className="btn-block" type="submit">Iniciar sesión</Button>
                </div>
                <p className="small mb-5 pb-lg-2"><a className="text-muted" href="#!">Olvidaste tu contraseña?</a></p>
                <p>No tienes cuenta? <Link to="/registration-select" className="link-info">Regístrate</Link></p>
              </Form>
            </div>
          </Col>
          <Col sm={6} className="px-0 d-none d-sm-block">
            <div className="LoginImagen backgroundImage" />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default LoginPage;
