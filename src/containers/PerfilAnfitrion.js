import React, { useContext, useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import useLogout from "../hooks/useLogout";
import Footer from "../components/Footer";
import { Container, Row, Col, Button, Badge } from "react-bootstrap"; // Asegúrate de importar Badge desde react-bootstrap
import { AppContext } from "../contexts/AppContext";
import axios from "axios";
import profileIcon from "../images/145857007_307ce493-b254-4b2d-8ba4-d12c080d6651.jpg";
import LoadingOverlay from "../components/LoadingOverlay";
import "../styles/PerfilAnfitrionStyle.css"; // Importa el archivo CSS

const PerfilAnfitrion = () => {
  const { setUsuarioLogeado } = useContext(AppContext);
  const [datosAnfitrion, setDatosAnfitrion] = useState({});
  const [loading, setLoading] = useState(true);

  const logout = useLogout();

  useEffect(() => {
    const storedUsuarioLogeado = JSON.parse(localStorage.getItem("usuarioLogeado"));
    if (storedUsuarioLogeado) {
      setUsuarioLogeado(storedUsuarioLogeado);
    } else {
      return;
    }

    if (storedUsuarioLogeado.id) {
      axios
        .get(`https://api-petsion.onrender.com/anfitrion/${storedUsuarioLogeado.id}`)
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
      <Container className="vh-100">
        <Row className="justify-content-start">
          <Col className="profile-container" md="5">
            <img src={profileIcon} className="profile-icon" alt="profile_icon" />
            <h1 className="nombre-anfitrion">{`${datosAnfitrion.name} ${datosAnfitrion.lastname}`}</h1>
            <h2 className="direccion-anfitrion">{datosAnfitrion.direccion}</h2> 
            <Button className="contact-button"> Contactar a {`${datosAnfitrion.name}`}
              </Button>
            <div className="services">
              <h3 className="section-title">Servicios</h3>
              <div className="service-item">
                <HomeIcon className="icon" />
                <p className="service-name">Alojamiento</p>
                <p className="service-price">$7.000 por Noche</p>
              </div>
              <div className="service-item">
                <WaypointsIcon className="icon" />
                <p className="service-name">Cuidado de Dia</p>
                <p className="service-price">$15.000 por Semana</p>
              </div>
              <div className="service-item">
                <PawPrintIcon className="icon" />
                <p className="service-name">Paseo</p>
                <p className="service-price">$4.000 Por paseo</p>
              </div>
            </div>
            <div className="can-host">
              <h3 className="section-title">{`${datosAnfitrion.name}`} Puede Cuidar</h3>
              <div className="badges">
                <Badge variant="custom-badge">Cats</Badge>
                <Badge variant="custom-badge">0-15 pounds</Badge>
                <Badge variant="custom-badge">16-40 pounds</Badge>
                <Badge variant="custom-badge">41-100 pounds</Badge>
                <Badge variant="custom-badge">101+ pounds</Badge>
              </div>
              <Button onClick={logout} style={{ marginTop: '20px' }}>Cerrar Sesion</Button>
            </div>
          </Col>
          <Col className="info-container" md="5">
            <div className="about-laura">
              <h3 className="section-title">Sobre {`${datosAnfitrion.name}`}</h3>
              <p className="description">
              ¡Hola! Soy Mauro, un cuidador de mascotas con una gran pasión por los gatos. Ofrezco un ambiente seguro y amoroso donde tu gato se sentirá cómodo y feliz. Con experiencia y dedicación, aseguro atención personalizada, juegos y cuidados especiales según sus necesidades. Te mantendré actualizado con fotos y mensajes durante todo el día. Confía en mí para cuidar de tu gato como si fuera mío. ¡Estoy aquí para darle el mejor día posible!
              </p>
            </div>
            <div className="home-info">
              <h3 className="section-title">Hogar</h3>
              <div className="home-item">
                <BuildingIcon className="icon" />
                <p className="home-description">Vive en un Departamento</p>
              </div>

              <div className="home-item">
                <CigaretteIcon className="icon" />
                <p className="home-description">No Fuma</p>
              </div>
              
              <div className="home-item">
                <DogIcon className="icon" />
                <p className="home-description">Tiene 1 Perro</p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default PerfilAnfitrion;

// Define the icons here as separate components
function BuildingIcon(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="16" height="20" x="4" y="2" rx="2" ry="2" />
      <path d="M9 22v-4h6v4" />
      <path d="M8 6h.01" />
      <path d="M16 6h.01" />
      <path d="M12 6h.01" />
      <path d="M12 10h.01" />
      <path d="M12 14h.01" />
      <path d="M16 10h.01" />
      <path d="M16 14h.01" />
      <path d="M8 10h.01" />
      <path d="M8 14h.01" />
    </svg>
  );
}

function HomeIcon(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function WaypointsIcon(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="4.5" r="2.5" />
      <path d="m10.2 6.3-3.9 3.9" />
      <circle cx="4.5" cy="12" r="2.5" />
      <path d="M7 12h10" />
      <circle cx="19.5" cy="12" r="2.5" />
      <path d="m13.8 17.7 3.9-3.9" />
      <circle cx="12" cy="19.5" r="2.5" />
    </svg>
  );
}

function PawPrintIcon(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 12s-1-2-2-2-2 2-2 2-2 1-2 3 1 2 1 2-2 3-1 5c0 0 3-1 6-1s6 1 6 1c1-2-1-5-1-5s1 0 1-2-2-3-2-3-1-2-2-2-2 2-2 2z" />
      <path d="M8.5 11c-1 0-1.5-.5-2-1.5S5.2 7.2 5.8 6s1.5-1 2-1.5 1.5.5 2 1.5.8 1.8.2 3-1 1.5-2 1.5z" />
      <path d="M15.5 11c-1 0-1.5-.5-2-1.5s-.8-1.8-.2-3 1-1.5 2-1.5 1.5.5 2 1.5.8 1.8.2 3-1 1.5-2 1.5z" />
      <path d="M9 5.5c-.5 1-1.5 1.3-2.5 1s-1.3-1.5-1-2.5 1.5-1.3 2.5-1 1.3 1.5 1 2.5z" />
      <path d="M15 5.5c-.5 1-1.5 1.3-2.5 1s-1.3-1.5-1-2.5 1.5-1.3 2.5-1 1.3 1.5 1 2.5z" />
    </svg>
  );
}

function CigaretteIcon(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 12h0" />
      <path d="M22 12h0" />
      <path d="M7 7a4 4 0 0 1 4 4v5" />
      <path d="M5 21H3V12h2" />
      <path d="M22 12v9" />
    </svg>
  );
}

function DogIcon(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 13V7a5 5 0 0 1 10 0v1.5" />
      <path d="M19 13v-2a5 5 0 0 0-5-5h-1a5 5 0 0 0-5 5v8" />
      <path d="M16 12a4 4 0 1 1-8 0V9a4 4 0 1 1 8 0v3z" />
      <path d="M14.5 20a2.5 2.5 0 0 1-5 0V15.5" />
      <path d="M10 18H6v-3a2 2 0 0 1 4 0v3zm8 0h-4v-3a2 2 0 0 1 4 0v3z" />
      <path d="M12 13V7a5 5 0 0 1 10 0v6a5 5 0 0 1-5 5h-5" />
    </svg>
  );
}
