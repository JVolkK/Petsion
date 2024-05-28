import React, { useContext, useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import useLogout from "../hooks/useLogout";
import Footer from "../components/Footer";
import { Container, Row, Col, Button } from "react-bootstrap";
import { AppContext } from "../contexts/AppContext";
import axios from "axios";

const PerfilAnfitrion = () => {
  const { usuarioLogeado, setUsuarioLogeado } = useContext(AppContext);
  const [datosAnfitrion, setDatosAnfitrion] = useState({});

  const logout = useLogout();

  useEffect(() => {
    const storedUsuarioLogeado = JSON.parse(
      localStorage.getItem("usuarioLogeado")
    );
    if (storedUsuarioLogeado) {
      setUsuarioLogeado(storedUsuarioLogeado);
    } else {
      return;
    }

    if (storedUsuarioLogeado.id) {
      axios
        .get(
          `https://api-petsion.onrender.com/anfitrion/${storedUsuarioLogeado.id}`
        )
        .then((response) => {
          // Guardar los datos en el estado
          setDatosAnfitrion(response.data);
        })
        .catch((error) => {});
    } else {
    }
  }, [setUsuarioLogeado, setDatosAnfitrion]);

  return (
    <>
      <NavBar />
      <Container className="vh-100">
        <Row className="border">
          <Col className="border">
            <h1>{usuarioLogeado.rol}</h1>
            <h1>{usuarioLogeado.id}</h1>
            <h1>{datosAnfitrion.name}</h1>
          </Col>
        </Row>

        <Row className="border">
          <Col className="border">
            <h1>Text 2</h1>
          </Col>
        </Row>
        <Button onClick={logout}>Log out</Button>
      </Container>
      <Footer />
    </>
  );
};

export default PerfilAnfitrion;
