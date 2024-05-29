import React, { useContext, useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import useLogout from "../hooks/useLogout";
import Footer from "../components/Footer";
import { Container, Row, Col, Button } from "react-bootstrap";
import { AppContext } from "../contexts/AppContext";
import axios from "axios";
import profileIcon from "../images/145857007_307ce493-b254-4b2d-8ba4-d12c080d6651.jpg";
import LoadingOverlay from "../components/LoadingOverlay";
import AddPetCard from "../components/AddPetCard";

const PerfilDuenio = () => {
  const { setUsuarioLogeado } = useContext(AppContext);
  const [datosAnfitrion, setDatosAnfitrion] = useState({});
  const [loading, setLoading] = useState(true);

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
        .get(`https://api-petsion.onrender.com/user/${storedUsuarioLogeado.id}`)
        .then((response) => {
          // Guardar los datos en el estado
          setDatosAnfitrion(response.data);
          setLoading(false);
        })
        .catch((error) => {});
    } else {
      setLoading(true);
    }
  }, [setUsuarioLogeado, setDatosAnfitrion, setLoading]);

  return (
    <>
      <LoadingOverlay loading={loading} />
      <NavBar />
      <Container className="vh-100">
        <Row className="">
          <Col className="border" md="5">
            <img src={profileIcon} className="w-25" alt="profile_icon" />
            <h1>{`${datosAnfitrion.name} ${datosAnfitrion.lastname}`}</h1>
            <h2>{datosAnfitrion.codigoPostal}</h2>
          </Col>
        </Row>

        <Row className="w-100 justify-content-around">
          <Col xl={4} md={5}>
            <AddPetCard />
          </Col>
          <Col xl={4} md={5}>
            <Container className="border">
              <h3>Añadir mascota</h3>
            </Container>
          </Col>
          <Col xl={4} md={5}>
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
