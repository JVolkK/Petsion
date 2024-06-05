import React, { useContext, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "../components/NavBar";
import useLogout from "../hooks/useLogout";
import { Container, Row, Col, Button, Badge } from "react-bootstrap"; // Asegúrate de importar Badge desde react-bootstrap
import { AppContext } from "../contexts/AppContext";
import axios from "axios";
import profileIcon from "../images/145857007_307ce493-b254-4b2d-8ba4-d12c080d6651.jpg";
import LoadingOverlay from "../components/LoadingOverlay";
import "../styles/PerfilAnfitrionStyle.css";
import { FaHome } from "react-icons/fa"; // Importa el archivo CSS
import { IoTennisball } from "react-icons/io5";
import { MdOutlinePets } from "react-icons/md";
import { BiSolidBuildingHouse } from "react-icons/bi";
import { GiHighGrass } from "react-icons/gi";
import { FaUserGroup, FaShieldDog } from "react-icons/fa6";

const PerfilAnfitrion = () => {
  const { setUsuarioLogeado } = useContext(AppContext);
  const [datosAnfitrion, setDatosAnfitrion] = useState({});
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
        .get(
          `https://api-petsion.onrender.com/anfitrion/${storedUsuarioLogeado.id}`
        )
        .then((response) => {
          setDatosAnfitrion(response.data);
          setLoading(false);
        })
        .catch((error) => {});
    } else {
      setLoading(true);
    }
  }, [setUsuarioLogeado, setDatosAnfitrion, setLoading]);

  return (
    <>
      <LoadingOverlay loading={loading} />
      <NavBar />
      <Container className="vh-100 p-auto m-auto">
        <Row className="justify-content-start custom-row-padding">
          <Col className="profile-container" md="6">
            <img
              src={profileIcon}
              className="profile-icon"
              alt="profile_icon"
            />
            <h1 className="nombre-anfitrion">{`${datosAnfitrion.name} ${datosAnfitrion.lastname}`}</h1>
            <h2 className="direccion-anfitrion">{datosAnfitrion.direccion}</h2>
            <div className="services">
              <h3 className="section-title">Servicios</h3>
              <div className="service-item">
                <FaHome className="icon" />
                <p className="service-name">Alojamiento:</p>
                <p className="service-price">
                  ${`${datosAnfitrion.tarifaBase}`} por Noche
                </p>
              </div>
              <div className="service-item">
                <IoTennisball className="icon" />
                <p className="service-name">Cuidado de Dia:</p>
                <p className="service-price">
                  ${`${datosAnfitrion.tarifaBase}`} por Semana
                </p>
              </div>
              <div className="service-item">
                <MdOutlinePets className="icon" />
                <p className="service-name">Paseo:</p>
                <p className="service-price">Acordar con el Cuidador</p>
              </div>
            </div>
            <div className="can-host">
              <h3 className="section-title">
                {`${datosAnfitrion.name}`} Puede Cuidar
              </h3>
              <div className="badges">
                {datosAnfitrion.admiteGato ? (
                  <Badge variant="custom-badge">Gato</Badge>
                ) : null}
                {datosAnfitrion.admitePerro ? (
                  <Badge variant="custom-badge">Perro</Badge>
                ) : null}
              </div>
            </div>
          </Col>
          <Col className="info-container" md="6">
            <div className="user-description">
              <h3 className="section-title">
                Sobre {`${datosAnfitrion.name}`}
              </h3>
              <p className="description">
                ¡Hola! Soy Mauro, un cuidador de mascotas con una gran pasión
                por los gatos. Ofrezco un ambiente seguro y amoroso donde tu
                gato se sentirá cómodo y feliz. Con experiencia y dedicación,
                aseguro atención personalizada, juegos y cuidados especiales
                según sus necesidades. Te mantendré actualizado con fotos y
                mensajes durante todo el día. Confía en mí para cuidar de tu
                gato como si fuera mío. ¡Estoy aquí para darle el mejor día
                posible!
              </p>
            </div>
            <div className="home-info">
              <h3 className="section-title">Hogar</h3>
              <div className="home-item">
                <BiSolidBuildingHouse className="icon" />
                <p className="home-description">
                  Vive en un {`${datosAnfitrion.tipoDeVivienda}`}
                </p>
              </div>

              <div className="home-item center-align">
                <GiHighGrass className="icon" />
                <p className="home-description">
                  {datosAnfitrion.conPatio ? "Con Patio" : "Sin Patio"}
                </p>
              </div>

              <div className="home-item">
                <FaUserGroup className="icon" />
                <p className="home-description">
                  {datosAnfitrion.distintoDueño
                    ? "Acepta distinto dueño"
                    : "No acepta distinto dueño"}
                </p>
              </div>

              <div className="home-item">
                <FaShieldDog className="icon" />
                <p className="home-description">
                  Acepta hasta {datosAnfitrion.cantidadDeAnimales} Mascotas
                </p>
              </div>
            </div>
          </Col>
        </Row>
        <Col className="boton-col">
          <Button onClick={logout} className="BotonLogout">
            Cerrar Sesión
          </Button>
        </Col>
      </Container>
    </>
  );
};

export default PerfilAnfitrion;
