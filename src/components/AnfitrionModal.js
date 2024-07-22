import React from "react";
import "../styles/ModalAnfitrionStyle.css";
import { Modal, Button, Badge, Col, Row, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { IoTennisball } from "react-icons/io5";
import { MdOutlinePets } from "react-icons/md";
import { BiSolidBuildingHouse } from "react-icons/bi";
import { GiHighGrass } from "react-icons/gi";
import { FaUserGroup, FaShieldDog } from "react-icons/fa6";
import { GiRabbit } from "react-icons/gi";
import { PiCatBold } from "react-icons/pi";
import { PiDogBold } from "react-icons/pi";
import CustomAvatar from "./CustomAvatar"; // Importa el componente CustomAvatar
import Rating from "@mui/material/Rating";

const AnfitrionModal = ({ show, onHide, datosAnfitrion }) => {
  const navigate = useNavigate();

  if (!datosAnfitrion) return null;

  return (
    <Modal show={show} onHide={onHide} dialogClassName="modal-xl">
      <Modal.Body>
        <Container className="vh-100">
          <Row className="justify-content-start custom-row-padding">
            <Col className="profile-container" md="6">
              <CustomAvatar
                width="6rem"
                height="6rem"
                fontSize="2rem"
                nombre={datosAnfitrion.name}
                apellido={datosAnfitrion.lastname}
                onClick={() => {
                  // Agrega la lógica de clic si es necesaria
                }}
              />
              <h1 className="nombre-anfitrion">{`${datosAnfitrion.name} ${datosAnfitrion.lastname}`}</h1>
              {datosAnfitrion.rating !== undefined &&
                datosAnfitrion.numberOfRatings !== undefined && (
                  <div className="d-flex">
                    <Rating
                      name="read-only"
                      value={datosAnfitrion.rating}
                      readOnly
                    />
                    {"  "}({datosAnfitrion.numberOfRatings})
                  </div>
                )}
              <h2 className="direccion-anfitrion">
                {datosAnfitrion.direccion}
              </h2>
              <Button
                className="contact-button"
                onClick={() => {
                  navigate(`/reservar-cuidador/${datosAnfitrion._id}`);
                }}
              >
                Contactar a {`${datosAnfitrion.name}`}
              </Button>
              <div className="services">
                <h3 className="section-title">Servicios</h3>

                {datosAnfitrion.disponibilidadVisita && (
                  <div className="service-item py-2">
                    <FaHome className="icon" />
                    <p className="service-name m-0">Alojamiento:</p>
                    <p className="service-price m-0 px-0">
                      ${`${datosAnfitrion.tarifaBase}`} por noche
                    </p>
                  </div>
                )}
                {datosAnfitrion.disponibilidadVisita && (
                  <div className="service-item py-2">
                    <IoTennisball className="icon" />
                    <p className="service-name m-0">Cuidado de Día:</p>
                    <p className="service-price m-0 px-0">
                      ${`${datosAnfitrion.tarifaBase}`} el día
                    </p>
                  </div>
                )}
                {datosAnfitrion.disponibilidadPaseo && (
                  <div className="service-item py-2">
                    <MdOutlinePets className="icon" />
                    <p className="service-name m-0">Paseo:</p>
                    <p className="service-price m-0">Acordar con el Cuidador</p>
                  </div>
                )}
              </div>

              <div className="can-host">
                <h3 className="section-title">
                  {`${datosAnfitrion.name}`} Puede Cuidar
                </h3>
                <div className="badges">
                  {datosAnfitrion.admiteGato ? (
                    <Badge
                      variant="custom-badge"
                      className="d-flex align-items-center justify-content-center py-1 px-2"
                    >
                      <PiCatBold className="large-icon" />
                    </Badge>
                  ) : null}
                  {datosAnfitrion.admitePerro ? (
                    <Badge
                      variant="custom-badge"
                      className="d-flex align-items-center justify-content-center py-1 px-2"
                    >
                      <PiDogBold className="large-icon" />
                    </Badge>
                  ) : null}
                  {datosAnfitrion.admitAlltypesMascotas ? (
                    <Badge
                      variant="custom-badge"
                      className="d-flex align-items-center justify-content-center py-1 px-2"
                    >
                      <GiRabbit className="large-icon" />
                    </Badge>
                  ) : null}
                </div>
              </div>
              <Row className="dias-disponibles d-flex justify-content-start align-items-center">
                <h3 className="section-title my-4">Disponibilidad semanal</h3>
                <Col
                  xl={12}
                  className={
                    datosAnfitrion.disponibilidadlunes
                      ? "dia-disponible mx-2 mb-1 w-auto"
                      : "dia-no-disponible mx-2 w-auto"
                  }
                >
                  Lunes
                </Col>
                <Col
                  xl={12}
                  className={
                    datosAnfitrion.disponibilidadmartes
                      ? "dia-disponible mx-2 mb-1 w-auto"
                      : "dia-no-disponible mx-2 w-auto"
                  }
                >
                  Martes
                </Col>
                <Col
                  xl={12}
                  className={
                    datosAnfitrion.disponibilidadmiercoles
                      ? "dia-disponible mx-2 mb-1 w-auto"
                      : "dia-no-disponible mx-2 w-auto"
                  }
                >
                  Miércoles
                </Col>
                <Col
                  xl={12}
                  className={
                    datosAnfitrion.disponibilidadjueves
                      ? "dia-disponible mx-2 mb-1 w-auto"
                      : "dia-no-disponible mx-2 w-auto"
                  }
                >
                  Jueves
                </Col>
                <Col
                  xl={12}
                  className={
                    datosAnfitrion.disponibilidadviernes
                      ? "dia-disponible mx-2 mb-1 w-auto"
                      : "dia-no-disponible mx-2 w-auto"
                  }
                >
                  Viernes
                </Col>
                <Col
                  xl={12}
                  className={
                    datosAnfitrion.disponibilidadsabado
                      ? "dia-disponible mx-2 mb-1 w-auto"
                      : "dia-no-disponible mx-2 w-auto"
                  }
                >
                  Sábado
                </Col>
                <Col
                  xl={2}
                  className={
                    datosAnfitrion.disponibilidaddomingo
                      ? "dia-disponible mx-2 w-auto"
                      : "dia-no-disponible mx-2 w-auto"
                  }
                >
                  Domingo
                </Col>
              </Row>
            </Col>
            <Col className="info-container" md="6">
              <div className="user-description">
                <h3 className="section-title">
                  Sobre {`${datosAnfitrion.name}`}
                </h3>
                <p className="description">
                  ¡Hola! Soy {`${datosAnfitrion.name}`}, un cuidador de mascotas
                  con una gran pasión por los gatos. Ofrezco un ambiente seguro
                  y amoroso donde tu gato se sentirá cómodo y feliz. Con
                  experiencia y dedicación, aseguro atención personalizada,
                  juegos y cuidados especiales según sus necesidades. Te
                  mantendré actualizado con fotos y mensajes durante todo el
                  día. Confía en mí para cuidar de tu gato como si fuera mío.
                  ¡Estoy aquí para darle el mejor día posible!
                </p>
              </div>
              <div className="home-info">
                <h3 className="section-title">Hogar</h3>
                <div className="home-item py-2">
                  <BiSolidBuildingHouse className="icon" />
                  <p className="home-description m-0">
                    Vive en un {`${datosAnfitrion.tipoDeVivienda}`}
                  </p>
                </div>

                <div className="home-item py-2">
                  <GiHighGrass className="icon" />
                  <p className="home-description m-0">
                    {datosAnfitrion.conPatio ? "Con Patio" : "Sin Patio"}
                  </p>
                </div>

                <div className="home-item py-2">
                  <FaUserGroup className="icon" />
                  <p className="home-description m-0">
                    {datosAnfitrion.distintoDueño
                      ? "Acepta distinto dueño"
                      : "No acepta distinto dueño"}
                  </p>
                </div>

                <div className="home-item py-2">
                  <FaShieldDog className="icon" />
                  <p className="home-description m-0">
                    Acepta hasta {datosAnfitrion.cantidadDeAnimales} Mascotas
                  </p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AnfitrionModal;
