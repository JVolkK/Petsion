import React, { useEffect, useState, useContext } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../styles/buscarCuidadorStyle.css";
import ProfileCard from "../components/ProfileCard";
import FilterAnfitrionForm from "../components/FilterAnfitrionForm";
import Mapa from "../components/Mapa";
import axios from "axios";
import { AppContext } from "../contexts/AppContext";

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
      <Container fluid>
        <Container>
          <FilterAnfitrionForm />
        </Container>
        <Container>
          <Row>
            <Col>
              {usuariosFiltrados.length > 0 ? (
                usuariosFiltrados.map((usuario, index) => (
                  <ProfileCard
                    key={index}
                    nombre={usuario.name}
                    apellido={usuario.lastname}
                    ubicacion={usuario.direccion}
                  />
                ))
              ) : (
                <p>No se han encontrado usuarios filtrados</p>
              )}
            </Col>
            <Col md={5}>
              <Mapa locations={locations} />
            </Col>
          </Row>
        </Container>
      </Container>
      <Footer />
    </>
  );
};

export default BuscarCuidador;
