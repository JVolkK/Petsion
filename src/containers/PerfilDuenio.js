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
import CardMascotaPerfilDuenio from "../components/CardMascotaPerfilDuenio";
import "../styles/cardMascotaPerfilDuenio.css";
import { CiLogout } from "react-icons/ci";

const PerfilDuenio = () => {
  const { setUsuarioLogeado } = useContext(AppContext);
  const [datosAnfitrion, setDatosAnfitrion] = useState({});
  const [mascotas, setMascotas] = useState({});
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
        })
        .catch((error) => {});

      axios
        .post(`https://api-petsion.onrender.com/mascota/listar`, {
          user: storedUsuarioLogeado.id,
        })
        .then((response) => {
          // Guardar los datos en el estado
          setMascotas(response.data);
          setLoading(false);
        })
        .catch((error) => {});
    } else {
      setLoading(true);
    }
  }, [setUsuarioLogeado, setDatosAnfitrion, setLoading, setMascotas]);

  return (
    <>
      <LoadingOverlay loading={loading} />
      <NavBar />
      <Container className="">
        <Row className="pb-4">
          <Col className="border rounded" xl={4} xs={12} md={10}>
            <img src={profileIcon} className="w-25" alt="profile_icon" />
            <h1>{`${datosAnfitrion.name} ${datosAnfitrion.lastname}`}</h1>
            <h6>{datosAnfitrion.email}</h6>
            <h6>Telefono: {datosAnfitrion.telefono}</h6>
            <h6>Dni: {datosAnfitrion.dni}</h6>
          </Col>
          <Col
            xl={2}
            xs={6}
            md={4}
            className="h-100 justify-content-center d-flex"
          >
            <AddPetCard setUsuarioLogeado={setUsuarioLogeado} />
          </Col>
          <Col
            xl={2}
            md={4}
            xs={6}
            className="h-100 justify-content-center d-flex"
            onClick={logout}
          >
            <Container
              fluid
              className="clickable-card border rounded m-3 p-0 rounded border"
            >
              <Row>
                <CiLogout size={80} className="w-100 hoverIcon" />
              </Row>
              <Row>
                <h5 className=" w-100 addPetCardTitle justify-content-center align-items-center d-flex ">
                  Cerrar Sesión
                </h5>
              </Row>
            </Container>
          </Col>
        </Row>

        <Row className="w-100 justify-content-start vh-100 scrollable-row ">
          {mascotas.length > 0 ? (
            mascotas.map((mascota, index) => (
              <Col xl={2} md={3} sm={2} className="pb-3">
                <CardMascotaPerfilDuenio
                  key={index}
                  nombre={mascota.nombre}
                  tipoMascota={mascota.tipoMascota}
                  edad={mascota.edad}
                  peso={mascota.peso}
                />
              </Col>
            ))
          ) : (
            <></>
          )}
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default PerfilDuenio;
