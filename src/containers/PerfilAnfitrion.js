import React, { useContext, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "../components/NavBar";
import useLogout from "../hooks/useLogout";
import { Container, Row, Col, Button, Badge } from "react-bootstrap"; // Asegúrate de importar Badge desde react-bootstrap
import { AppContext } from "../contexts/AppContext";
import axios from "axios";
import LoadingOverlay from "../components/LoadingOverlay";
import "../styles/PerfilAnfitrionStyle.css";
import { FaHome } from "react-icons/fa"; // Importa el archivo CSS
import { IoTennisball } from "react-icons/io5";
import { MdOutlinePets } from "react-icons/md";
import { MdModeEdit } from "react-icons/md";
import { BiSolidBuildingHouse } from "react-icons/bi";
import { GiHighGrass } from "react-icons/gi";
import { FaUserGroup, FaShieldDog } from "react-icons/fa6";
import { GiRabbit } from "react-icons/gi";
import { PiCatBold } from "react-icons/pi";
import { PiDogBold } from "react-icons/pi";
import CustomAvatar from "../components/CustomAvatar";

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
            <CustomAvatar
                nombre={datosAnfitrion.name}
                apellido={datosAnfitrion.lastname}
                onClick={() => {
                  // Agrega la lógica de clic si es necesaria
                }}
              />
            <h1 className="nombre-anfitrion">{`${datosAnfitrion.name} ${datosAnfitrion.lastname}`}</h1>
            <h2 className="direccion-anfitrion">{datosAnfitrion.direccion}</h2>
            <Button className="edit-button d-flex align-items-center justify-content-center">
              <MdModeEdit className="inbox-icon me-2" /> Editar Perfil
            </Button>
            <div className="services">
              <h3 className="section-title">Servicios</h3>
              <div className="service-item py-2">
                <FaHome className="icon" />
                <p className="service-name m-0">Alojamiento:</p>
                <p className="service-price m-0">
                  ${`${datosAnfitrion.tarifaBase}`} por Noche
                </p>
              </div>
              <div className="service-item py-2">
                <IoTennisball className="icon" />
                <p className="service-name m-0">Cuidado de Dia:</p>
                <p className="service-price m-0">
                  ${`${datosAnfitrion.tarifaBase}`} por Semana
                </p>
              </div>
              <div className="service-item py-2">
                <MdOutlinePets className="icon" />
                <p className="service-name m-0">Paseo:</p>
                <p className="service-price m-0">Acordar con el Cuidador</p>
              </div>
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
                    <PiCatBold className="inbox-icon me-1 large-icon" />
                    Gato
                  </Badge>
                ) : null}
                {datosAnfitrion.admitePerro ? (
                  <Badge
                    variant="custom-badge"
                    className="d-flex align-items-center justify-content-center py-1 px-2"
                  >
                    <PiDogBold className="inbox-icon me-1 large-icon" />
                    Perro
                  </Badge>
                ) : null}
                {datosAnfitrion.admitAlltypesMascotas ? (
                  <Badge
                    variant="custom-badge"
                    className="d-flex align-items-center justify-content-center py-1 px-2"
                  >
                    <GiRabbit className="inbox-icon me-1 large-icon" />
                    Otros
                  </Badge>
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
