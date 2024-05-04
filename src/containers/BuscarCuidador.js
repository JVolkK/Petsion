import React, { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ProfileCard from "../components/ProfileCard";
import ejemploFoto from "../images/tobey.jpg";
import "../styles/buscarCuidadorStyle.css";

const BuscarCuidador = () => {
  useEffect(() => {
    const map = L.map("map").setView([-26.8083, -65.2176], 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
    }).addTo(map);
  }, []);

  return (
    <>
      <NavBar />
      <Container fluid>
        <Container>
          <Row>
            <Col>
              <label>Servicios:</label>
              <select>
                <option value="alojamiento">Alojamiento</option>
                <option value="cuidado-dia">Cuidado de día</option>
                <option value="paseo">Paseo</option>
              </select>
            </Col>
            <Col>
              <label>Zona:</label>
              <input type="text" value="" readOnly />
            </Col>
            <Col>
              <label>Fecha de entrada:</label>
              <input type="date" />
            </Col>
            <Col>
              <label>Fecha de salida:</label>
              <input type="date" />
            </Col>
            <Col>
              <label>Mascotas:</label>
              <select>
                <option value="perro">Perro</option>
                <option value="gato">Gato</option>
              </select>
            </Col>
          </Row>
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
              <div className="map-container">
                <div id="map" className="map"></div>
              </div>
            </Col>
          </Row>
        </Container>
      </Container>
      <Footer />
    </>
  );
};

export default BuscarCuidador;
