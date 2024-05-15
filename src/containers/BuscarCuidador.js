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
import FilterAnfitrionForm from "../components/FilterAnfitrionForm";

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
