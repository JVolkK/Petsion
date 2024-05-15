import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import NavBar from '../components/NavBar';
import '../styles/login.css';
import { useHistory } from 'react-router';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('user');
  const [usuarioValido, setUsuarioValido] = useState({
    role: "user",
    _id: "663d5eceb8cbb69c7cd1bc8b",
    name: "Luis",
    email: "luis@example.com"
  });
  const [error, setError] = useState(null);
  const history = useHistory();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      let loginUrl = '';
      if (userType === 'user') {
        loginUrl = 'https://apipetsion-production.up.railway.app/user/login';
      } else {
        loginUrl = 'https://apipetsion-production.up.railway.app/anfitrion/login';
      }

      // Simulación de una respuesta de la API
      const simulatedResponse = {
        data: {
          token: "fakeToken123",
          role: userType,
          _id: "663d5eceb8cbb69c7cd1bc8b",
          name: "Luis",
          email: "luis@example.com"
        }
      };

      // En lugar de hacer una petición real, usaremos la respuesta simulada
      const response = simulatedResponse;
      setUsuarioValido(response.data);
      handleTokenStorage(response.data.token);
      console.log('Login exitoso:', response.data);
      
      // Redirigir al usuario al Home después del inicio de sesión
      history.push('/');
    } catch (error) {
      console.error('Error en el login:', error.message);
      setError('Error en el login');
    }
  };

  const handleTokenStorage = (token) => {
    try {
      localStorage.setItem('authToken', token);
      console.log('Token guardado en localStorage:', token);
    } catch (error) {
      console.error('Error al guardar el token en localStorage:', error);
    }
  };
  

  return (
    <>
      <section className="vh-100">
        <Container fluid>
          <Row>
            <NavBar />
            <Col sm={6} className="text-black">
              <div className="px-5 ms-xl-4">
                <i className="fas fa-crow fa-2x me-3 pt-5 mt-xl-4" style={{ color: '#709085' }}></i>
                <span className="h1 fw-bold mb-0"></span>
              </div>
              <div className="d-flex align-items-center h-custom-0 px-5 ms-xl-4 mt-5 pt-5 pt-xl-0 mt-xl-n5">
                <Form style={{ width: '23rem' }} onSubmit={handleLogin}>
                  <h3 className="fw-normal mb-3 pb-3" style={{ letterSpacing: '1px' }}>Iniciar Sesión</h3>
                  <Form.Group className="mb-4" controlId="formBasicEmail">
                    <Form.Control type="email" placeholder="Correo electrónico o Usuario" size="lg" value={email} onChange={(e) => setEmail(e.target.value)} />
                  </Form.Group>
                  <Form.Group className="mb-4" controlId="formBasicPassword">
                    <Form.Control type="password" placeholder="Contraseña" size="lg" value={password} onChange={(e) => setPassword(e.target.value)} />
                  </Form.Group>
                  <Form.Group controlId="formUserType">
                    <Form.Label>Seleccionar tipo de cuenta:</Form.Label>
                    <Form.Control as="select" value={userType} onChange={(e) => setUserType(e.target.value)}>
                      <option value="user">Usuario</option>
                      <option value="anfitrion">Anfitrión</option>
                    </Form.Control>
                  </Form.Group>
                  {error && <p className="text-danger">{error}</p>}
                  <div className="pt-1 mb-4">
                  <Button variant="info" size="lg" block type="submit">Iniciar sesión</Button>
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
