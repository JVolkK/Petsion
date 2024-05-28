import React, { useContext, useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import useLogout from "../hooks/useLogout";
import Footer from "../components/Footer";
import { Container, Row, Col, Button } from "react-bootstrap";
import { AppContext } from "../contexts/AppContext";
import axios from "axios";
import profileIcon from "../images/145857007_307ce493-b254-4b2d-8ba4-d12c080d6651.jpg";
import PetsIcon from "@mui/icons-material/Pets";

const PerfilDuenio = () => {
  const { setUsuarioLogeado } = useContext(AppContext);
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
          <Col className="border" md="5">
            <img src={profileIcon} className="w-25" alt="profile_icon" />
            <h1>{`${datosAnfitrion.name} ${datosAnfitrion.lastname}`}</h1>
            <h2>
              <h1>{datosAnfitrion.codigoPostal}</h1>
            </h2>
          </Col>
        </Row>

        <Row className="border">
          <Col className="border">
            <Container className="border ">
              <Row className="justify-content-center align-items-center">
                <Col className="justify-content-center align-items-center">
                  <PetsIcon color="primary" sx={{ fontSize: 100 }} />
                  <h4>Añadir mascota</h4>
                </Col>
              </Row>
            </Container>
          </Col>
          <Col className="border">
            <Container className="border">
              <h3>Añadir mascota</h3>
            </Container>
          </Col>
          <Col className="border">
            <Container className="border">
              <h3>Añadir mascota</h3>
            </Container>
          </Col>
        </Row>
        <Button onClick={logout}>Log out</Button>
      </Container>
      <Footer />
    </>
  );
};

export default PerfilDuenio;
