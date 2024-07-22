import React, { useContext, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "../components/NavBar";
import useLogout from "../hooks/useLogout";
import Footer from "../components/Footer";
import { Container, Row, Col, Button } from "react-bootstrap";
import { AppContext } from "../contexts/AppContext";
import axios from "axios";
import LoadingOverlay from "../components/LoadingOverlay";
import AddPetCard from "../components/AddPetCard";
import CardMascotaPerfilDuenio from "../components/CardMascotaPerfilDuenio";
import "../styles/cardMascotaPerfilDuenio.css";
import { CiLogout } from "react-icons/ci";
import CustomAvatar from "../components/CustomAvatar";

const PerfilDuenio = () => {
  const { setUsuarioLogeado } = useContext(AppContext);
  const [datosAnfitrion, setDatosAnfitrion] = useState({});
  const [mascotas, setMascotas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [renderKey, setRenderKey] = useState(0);

  // Función para forzar el re-render
  const handleRerender = () => setRenderKey((prevKey) => prevKey + 1);

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
      setLoading(true);
      axios
        .get(`https://api-petsion.onrender.com/user/${storedUsuarioLogeado.id}`)
        .then((response) => {
          // Guardar los datos en el estado
          setDatosAnfitrion(response.data);
          setLoading(false);
        })
        .catch((error) => {});

      setLoading(true);
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
    }
  }, [
    setUsuarioLogeado,
    setDatosAnfitrion,
    setLoading,
    setMascotas,
    renderKey,
  ]);

  return (
    <>
      <LoadingOverlay loading={loading} />
      <NavBar />
      <Container className="m-auto p-auto ">
        <Row className="pb-4 justify-content-center">
          <Col
            xl={4}
            xs={12}
            md={10}
            className="border rounded p-4 text-center"
          >
            <div className="d-flex justify-content-center">
              <CustomAvatar
                width="6rem"
                height="6rem"
                fontSize="2rem"
                nombre={datosAnfitrion.name}
                apellido={datosAnfitrion.lastname}
              />
            </div>
            <h1 className="mt-2">{`${datosAnfitrion.name} ${datosAnfitrion.lastname}`}</h1>
            <h6>{datosAnfitrion.email}</h6>
            <h6>Telefono: {datosAnfitrion.telefono}</h6>
            <h6>Dni: {datosAnfitrion.dni}</h6>
          </Col>
        </Row>

        <Row className="pb-4 justify-content-center">
          <Col xl={2} md={4} xs={6} className="text-center">
            <Button
              variant="primary"
              onClick={logout}
              className="text-center"
              style={{ backgroundColor: "#4E75B5", borderColor: "#324c75" }}
            >
              <CiLogout size={30} className="mr-2" />
              Cerrar Sesión
            </Button>
          </Col>
        </Row>

        <Row className="w-100 justify-content-center">
          {mascotas.length > 0 ? (
            <>
              <h1 className="mt-4">Mis Mascotas</h1>
              {mascotas.map((mascota, index) => (
                <Col key={index} xl={2} md={3} sm={2} className="pb-3">
                  <CardMascotaPerfilDuenio
                    nombre={mascota.nombre}
                    tipoMascota={mascota.tipoMascota}
                    edad={mascota.edad}
                    peso={mascota.peso}
                  />
                </Col>
              ))}
              <Col
                xl={2}
                md={3}
                sm={2}
                className="pb-3 d-flex justify-content-center"
              >
                <AddPetCard handleRerender={handleRerender} />
              </Col>
            </>
          ) : (
            <Col className="text-center">
              <h1 className="mt-4">Añade tu primer mascota</h1>
              <AddPetCard handleRerender={handleRerender} />
            </Col>
          )}
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default PerfilDuenio;
