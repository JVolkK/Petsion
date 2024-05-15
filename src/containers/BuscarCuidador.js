import React, { useState } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ProfileCard from "../components/ProfileCard";
import ejemploFoto from "../images/tobey.jpg";
import Mapa from "../components/Mapa"; // Importa el componente del mapa
import "../styles/buscarCuidadorStyle.css";
import FilterAnfitrionForm from "../components/FilterAnfitrionForm";

const BuscarCuidador = () => {
  const [location, setLocation] = useState([-26.8083, -65.2176]); // Ubicación inicial

  // const handleSearchLocation = async (address) => {
  //   try {
  //     const response = await fetch(
  //       `https://nominatim.openstreetmap.org/search?format=json&q=${address}`
  //     );
  //     const data = await response.json();
  //     if (data.length > 0) {
  //       setLocation([parseFloat(data[0].lat), parseFloat(data[0].lon)]);
  //     }
  //   } catch (error) {
  //     console.error("Error searching location:", error);
  //   }
  // };

  // const handleLocationInputChange = (event) => {
  //   const address = event.target.value;
  //   handleSearchLocation(address);
  // };

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
              <ProfileCard
                nombre="Tobey"
                apellido="Maguire"
                ubicacion="San Miguel de Tucumán"
                foto={ejemploFoto}
              />
              <ProfileCard
                nombre="Tobey"
                apellido="Maguire"
                ubicacion="San Miguel de Tucumán"
                foto={ejemploFoto}
              />
              <ProfileCard
                nombre="Tobey"
                apellido="Maguire"
                ubicacion="San Miguel de Tucumán"
                foto={ejemploFoto}
              />
            </Col>
            <Col md={5}>
              {/* Mapa */}
              <Mapa location={location} />
            </Col>
          </Row>
        </Container>
      </Container>
      <Footer />
    </>
  );
};

export default BuscarCuidador;
