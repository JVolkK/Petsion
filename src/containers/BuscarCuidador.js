import React, { useEffect, useState, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import "../styles/buscarCuidadorStyle.css";
import ProfileCard from "../components/ProfileCard";
import FilterAnfitrionForm from "../components/FilterAnfitrionForm";
import Mapa from "../components/Mapa";
import axios from "axios";
import { AppContext } from "../contexts/AppContext";
import { Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const geocodeAddress = async (address) => {
  try {
    const response = await axios.get(
      "https://nominatim.openstreetmap.org/search",
      {
        params: {
          q: address,
          format: "json",
          addressdetails: 1,
          limit: 1,
        },
      }
    );
    if (response.data && response.data.length > 0) {
      const { lat, lon } = response.data[0];
      return { lat: parseFloat(lat), lng: parseFloat(lon) };
    }
    throw new Error(
      "No se encontraron coordenadas para la dirección proporcionada"
    );
  } catch (error) {
    console.error("Error al geocodificar la dirección:", error);
    return null;
  }
};

const BuscarCuidador = () => {
  const { usuariosFiltrados } = useContext(AppContext);
  const [locations, setLocations] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const navigate = useNavigate();

  const handleOpenModal = (usuario) => {
    setSelectedUser(usuario);
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  useEffect(() => {
    const fetchLocations = async () => {
      const geocodedLocations = await Promise.all(
        usuariosFiltrados.map(async (usuario) => {
          const coords = await geocodeAddress(usuario.direccion);
          if (coords) {
            return { ...usuario, ...coords };
          }
          return null;
        })
      );
      setLocations(geocodedLocations.filter((loc) => loc !== null));
    };

    if (usuariosFiltrados.length > 0) {
      fetchLocations();
    } else {
      setLocations([]);
    }
  }, [usuariosFiltrados]); // Dependencia a usuariosFiltrados

  return (
    <>
      <NavBar />
      <Container fluid className="h-100 m-auto p-auto">
        <Container className="m-auto p-auto">
          <FilterAnfitrionForm />
        </Container>
        <Container className="m-auto p-auto">
          <Row>
            <Col className="scrollable-col pt-3">
              {usuariosFiltrados.length > 0 ? (
                usuariosFiltrados.map((usuario, index) => (
                  <ProfileCard
                    key={index}
                    nombre={usuario.name}
                    apellido={usuario.lastname}
                    ubicacion={usuario.direccion}
                    tipoDeVivienda={usuario.tipoDeVivienda}
                    conPatio={usuario.conPatio}
                    onClick={() => handleOpenModal(usuario)}
                  />
                ))
              ) : (
                <p>
                  No se han encontrado cuidadores con esas caracteristicas 😞
                </p>
              )}
            </Col>
            <Col md={5} className="pt-3">
              <Mapa locations={locations} />
            </Col>
          </Row>
        </Container>
      </Container>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Información del Usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedUser && (
            <>
              <p>Nombre: {selectedUser.name}</p>
              <p>Apellido: {selectedUser.lastname}</p>
              <p>Ubicación: {selectedUser.direccion}</p>
              <Button
                className="contact-button"
                onClick={() => {
                  navigate(`/reservar-cuidador/${selectedUser._id}`);
                }}
              >
                Contactar a {`${selectedUser.name}`}
              </Button>
            </>
          )}
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
      <Footer />
    </>
  );
};

export default BuscarCuidador;
