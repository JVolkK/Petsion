import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../styles/login.css";
import { useLogin } from "../hooks/useLogin";
import useLoginState from "../hooks/useLoginState";
import NavBar from "../components/NavBar";
import LoadingOverlay from "../components/LoadingOverlay";
import Footer from "../components/Footer";

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

  const { handleLogin, loading, usernameRef, passwordRef } = useLogin(
    username,
    password,
    userType,
    setError
  );

  return (
    <>
      <NavBar />
      <section>
        <div>
          <LoadingOverlay loading={loading} />
          <Container fluid>
            <Row>
              <Col
                sm={6}
                className="d-flex align-items-center  px-sm-2 px-xl-5 px-md-5 px-lg-5 px-xs-5"
              >
                <div className="d-flex align-items-center  ">
                  <Form style={{ width: "23rem" }} onSubmit={handleLogin}>
                    <h1
                      className="fw-normal mb-3 pb-3"
                      style={{ letterSpacing: "1px" }}
                    >
                      Iniciar Sesión
                    </h1>

                    <Form.Group controlId="formUserTypeGroup">
                      <Form.Label>Seleccionar tipo de cuenta:</Form.Label>
                      <div className="mb-3">
                        <Form.Check
                          type="radio"
                          label="Dueño"
                          name="userType"
                          id="formUserTypeUser"
                          value="user"
                          checked={userType === "user"}
                          onChange={(e) => setUserType(e.target.value)}
                        />
                        <Form.Check
                          type="radio"
                          label="Anfitrión"
                          name="userType"
                          id="formUserTypeAnfitrion"
                          value="anfitrion"
                          checked={userType === "anfitrion"}
                          onChange={(e) => setUserType(e.target.value)}
                        />
                      </div>
                    </Form.Group>

                    <Form.Group className="mb-4" controlId="formBasicUsername">
                      <Form.Control
                        type="text"
                        placeholder="Nombre de Usuario"
                        size="lg"
                        className="w-75"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        ref={usernameRef}
                      />
                    </Form.Group>

                    <Form.Group className="mb-4" controlId="formBasicPassword">
                      <Form.Control
                        type="password"
                        placeholder="Contraseña"
                        size="lg"
                        className="w-75"
                        style={{ borderColor: "#4c78b5" }}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        ref={passwordRef}
                      />
                    </Form.Group>

                    {error && <p className="text-danger ">{error}</p>}
                    <div className="pt-1 mb-4">
                      <Button
                        variant="info"
                        size="lg"
                        className="btn-block "
                        type="submit"
                        style={{
                          backgroundColor: "#4E75B5",
                          borderColor: "#324c75",
                          color: "white",
                        }}
                      >
                        Iniciar sesión
                      </Button>
                    </div>
                    {/* <p className="small ">
                      <a className="text-muted" href="#!">
                        Olvidaste tu contraseña?
                      </a>
                    </p> */}
                    <p>
                      No tienes cuenta?{" "}
                      <Link
                        to="/registration-select"
                        style={{ color: "#4E75B5" }}
                      >
                        Regístrate
                      </Link>
                    </p>
                  </Form>
                </div>
              </Col>
              <Col sm={6} className="px-0 d-none d-sm-block">
                <div className="LoginImagen backgroundImage" />
              </Col>
            </Row>
          </Container>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default LoginPage;
