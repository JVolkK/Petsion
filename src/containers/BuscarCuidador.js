import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../styles/buscarCuidadorStyle.css";
//import { Link } from "react-router-dom";
//import Button from "react-bootstrap/Button";

const BuscarCuidador = () => {
    return (
        <>
            <NavBar />
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
                        <input type="text" value="Ciudad de Ejemplo" readOnly />
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
            <Footer />
        </>
    );
};

export default BuscarCuidador;