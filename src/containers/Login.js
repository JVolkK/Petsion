import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import NavBar from "../components/NavBar";
import "../styles/login.css";

const LoginPage = () => {
  const [usuarioValido, setusuarioValido] = userState({
    "role": "user",
    "_id": "663d5eceb8cbb69c7cd1bc8b",
    "name": "Luis",
    "email": "luis@example.com"
  })
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      let loginUrl = '';
      if (userType === 'user') {
        loginUrl = 'https://apipetsion-production.up.railway.app/user/login';
      } else {
        loginUrl = 'https://apipetsion-production.up.railway.app/anfitrion/login';
      }
      
      const newUser = {
        username,
        password,
        name,
        lastname,
        email,
        dni,
        fechaDeNacimiento,
        telefono,
        codigoPostal
      };

    //Simular la creación de un usuario en el front-end
    console.log('Nuevo usuario:', newUser);
    // Simular la respuesta del servidor con un token ficticio
    const fakeToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXIxMjMifQ.ZLFj58T5nyWplAzsI8Zv0A";
    setToken(fakeToken);
    // Aquí podrías realizar la petición con axios al servidor, pero por ahora simplemente simulamos la respuesta con el token ficticio
    console.log('Token de autenticación:', fakeToken);
    // Realizar la petición para iniciar sesión
    const response = await axios.post(loginUrl, newUser);
    // Manejar la respuesta del servidor aquí, por ejemplo, guardar el token de autenticación en el almacenamiento local
    console.log('Login exitoso:', response.data);
    } catch (error) {
    // Manejar errores de autenticación aquí
    console.error('Error en el login:', error.response.data);
    }
  };

  // Funcion para almacenar token en local del navegador
const handleTokenStorage = (token) => {
  localStorage.setItem('authToken', token);
  setToken(token);
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

//
//import React, { useState } from "react";
//import { Container, Row, Col, Form, Button } from 'react-bootstrap';
//import axios from 'axios';
//import NavBar from "../components/NavBar";
//import "../styles/login.css";
//
//const LoginPage = () => {
//  const [email, setEmail] = useState('');
//  const [password, setPassword] = useState('');
//  const [userType, setUserType] = useState('user'); // Valor por defecto: usuario normal
//
//  const handleLogin = async (e) => {
//    e.preventDefault();
//    try {
//      let loginUrl = '';
//      if (userType === 'user') {
//        loginUrl = 'https://apipetsion-production.up.railway.app/login/user';
//      } else {
//        loginUrl = 'https://apipetsion-production.up.railway.app/login/anfitrion';
//      }
//      
//      const response = await axios.post(loginUrl, { email, password });
//      // Manejar la respuesta del servidor aquí, por ejemplo, guardar el token de autenticación en el almacenamiento local
//      console.log('Login exitoso:', response.data);
//    } catch (error) {
//      // Manejar errores de autenticación aquí
//      console.error('Error en el login:', error.response.data);
//    }
//  };
//
//  return (
//    <>
//      <section className="vh-100">
//        <Container fluid>
//          <Row>
//            <NavBar />
//            <Col sm={6} className="text-black">
//              <div className="px-5 ms-xl-4">
//                <i className="fas fa-crow fa-2x me-3 pt-5 mt-xl-4" style={{ color: '#709085' }}></i>
//                <span className="h1 fw-bold mb-0"></span>
//              </div>
//              <div className="d-flex align-items-center h-custom-0 px-5 ms-xl-4 mt-5 pt-5 pt-xl-0 mt-xl-n5">
//                <Form style={{ width: '23rem' }} onSubmit={handleLogin}>
//                  <h3 className="fw-normal mb-3 pb-3" style={{ letterSpacing: '1px' }}>Iniciar Sesión</h3>
//                  <Form.Group className="mb-4" controlId="formBasicEmail">
//                    <Form.Control type="email" placeholder="Correo electrónico o Usuario" size="lg" value={email} onChange={(e) => setEmail(e.target.value)} />
//                  </Form.Group>
//                  <Form.Group className="mb-4" controlId="formBasicPassword">
//                    <Form.Control type="password" placeholder="Contraseña" size="lg" value={password} onChange={(e) => setPassword(e.target.value)} />
//                  </Form.Group>
//                  <Form.Group controlId="formUserType">
//                    <Form.Label>Seleccionar tipo de cuenta:</Form.Label>
//                    <Form.Control as="select" value={userType} onChange={(e) => setUserType(e.target.value)}>
//                      <option value="user">Dueño</option>
//                      <option value="anfitrion">Anfitrión</option>
//                    </Form.Control>
//                  </Form.Group>
//                  <div className="pt-1 mb-4">
//                    <Button variant="info" size="lg" block type="submit">Iniciar sesión</Button>
//                  </div>
//                  <p className="small mb-5 pb-lg-2"><a className="text-muted" href="#!">Olvidaste tu contraseña?</a></p>
//                  <p>No tenes cuenta? <a href="#!" className="link-info">Regístrate</a></p>
//                </Form>
//              </div>
//            </Col>
//            <Col sm={6} className="px-0 d-none d-sm-block">
//              <div className="LoginImagen backgroundImage" />
//            </Col>
//          </Row>
//        </Container>
//      </section>
//    </>
//  );
//};
//
//export default LoginPage;
//