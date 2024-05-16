import React from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ProfileCard from "../components/ProfileCard";
import ejemploFoto from "../images/tobey.jpg";
import "../styles/buscarCuidadorStyle.css";
import FilterAnfitrionForm from "../components/FilterAnfitrionForm";
import Mapa from "../components/Mapa";
import axios from 'axios';

const geocodeAddress = async (address) => {
  try {
    const response = await axios.get('https://nominatim.openstreetmap.org/search', {
      params: {
        q: address,
        format: 'json',
        addressdetails: 1,
        limit: 1,
      },
    });
    if (response.data && response.data.length > 0) {
      const { lat, lon } = response.data[0];
      return { lat: parseFloat(lat), lng: parseFloat(lon) };
    }
    throw new Error('No se encontraron coordenadas para la dirección proporcionada');
  } catch (error) {
    console.error('Error al geocodificar la dirección:', error);
    return null;
  }
};

const BuscarCuidador = () => {
  // const [location, setLocation] = useState([-26.8083, -65.2176]); // Ubicación inicial

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
              {locations.map((ubicacion, index) => (
                <ProfileCard
                  key={index}
                  nombre={ubicacion.nombre}
                  apellido={ubicacion.apellido}
                  ubicacion={ubicacion.direccion}
                  foto={ejemploFoto}
                />
              ))}
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