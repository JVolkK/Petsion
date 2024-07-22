import React, { useContext, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "../components/NavBar";
import useLogout from "../hooks/useLogout";
import { Container, Row, Col, Button, Badge } from "react-bootstrap"; // Asegúrate de importar Badge desde react-bootstrap
import { AppContext } from "../contexts/AppContext";
import axios from "axios";
import { Form, Modal } from "react-bootstrap";
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
import { InputGroup } from "react-bootstrap";
import { CiLogout } from "react-icons/ci";
import Rating from "@mui/material/Rating";

const PerfilAnfitrion = () => {
  const { setUsuarioLogeado } = useContext(AppContext);
  const [datosAnfitrion, setDatosAnfitrion] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [editedData, setEditedData] = useState({});
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

  const openModal = () => {
    setShowModal(true);
    setEditedData(datosAnfitrion);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const confirmChanges = () => {
    const storedUsuarioLogeado = JSON.parse(
      localStorage.getItem("usuarioLogeado")
    );
    const dataToUpdate = {}; // Objeto para almacenar solo los campos modificados

    // Compara cada campo entre editedData y datosAnfitrion
    // Si el valor en editedData es diferente al valor en datosAnfitrion, lo agrega a dataToUpdate
    for (const key in editedData) {
      if (editedData[key] !== datosAnfitrion[key]) {
        dataToUpdate[key] = editedData[key];
      }
    }

    // Muestra la animación de carga
    setLoading(true);

    axios
      .patch(
        `https://api-petsion.onrender.com/anfitrion/${storedUsuarioLogeado.id}`,
        dataToUpdate // Envía solo los campos modificados
      )
      .then((response) => {
        // Recarga la página para reflejar los cambios
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error al actualizar datos:", error);
      })
      .finally(() => {
        // Oculta la animación de carga después de recibir la respuesta
        setLoading(false);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedData({ ...editedData, [name]: value });
  };

  return (
    <>
      <LoadingOverlay loading={loading} />
      <NavBar />
      <Container className="vh-100 p-auto m-auto">
        <Row className="justify-content-start custom-row-padding">
          <Col className="profile-container" md="6">
            <CustomAvatar
              width="6rem"
              height="6rem"
              fontSize="2rem"
              nombre={datosAnfitrion.name}
              apellido={datosAnfitrion.lastname}
              onClick={openModal}
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

            <h2 className="direccion-anfitrion">{datosAnfitrion.direccion}</h2>
            <div className="d-flex">
              <Button
                onClick={openModal}
                className="edit-button d-flex align-items-center justify-content-center mx-1"
                style={{ backgroundColor: "#4E75B5", borderColor: "#324c75" }}
              >
                <MdModeEdit className="inbox-icon me-2" /> Editar Perfil
              </Button>
              <Button
                onClick={logout}
                className="mx-1"
                style={{ backgroundColor: "#4E75B5", borderColor: "#324c75" }}
              >
                <CiLogout size={20} className="inbox-icon me-2" />
                Cerrar Sesión
              </Button>
            </div>
            <Modal show={showModal} onHide={handleCloseModal}>
              <Modal.Body>
                <Form>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3" controlId="formNombre">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder={datosAnfitrion.name}
                          value={editedData.name}
                          onChange={handleChange}
                          name="name"
                        />
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="formDireccion">
                        <Form.Label>Dirección</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder={datosAnfitrion.direccion}
                          value={editedData.direccion}
                          onChange={handleChange}
                          name="direccion"
                        />
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="formPatio">
                        <Form.Label>¿Tienes patio?</Form.Label>
                        <Form.Select
                          value={editedData.conPatio}
                          onChange={handleChange}
                          name="conPatio"
                        >
                          <option value="true">Tengo patio</option>
                          <option value="false">No tengo patio</option>
                        </Form.Select>
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="formCantidadAnimales"
                      >
                        <Form.Label>¿Cuántas mascotas aceptas?</Form.Label>
                        <Form.Control
                          type="number"
                          placeholder={datosAnfitrion.cantidadDeAnimales}
                          value={editedData.cantidadDeAnimales}
                          onChange={(e) => {
                            const value = parseInt(e.target.value); // Convierte el valor a un número entero
                            if (!isNaN(value) && value >= 0 && value <= 10) {
                              setEditedData({
                                ...editedData,
                                cantidadDeAnimales: value,
                              });
                            }
                          }}
                          name="cantidadDeAnimales"
                          max={10}
                        />
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="formAdmiteGato">
                        <Form.Label>¿Aceptas Gatos?</Form.Label>
                        <Form.Select
                          value={editedData.admiteGato}
                          onChange={handleChange}
                          name="admiteGato"
                        >
                          <option value="true">Acepto Gatos</option>
                          <option value="false">No acepto Gatos</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3" controlId="formApellido">
                        <Form.Label>Apellido</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder={datosAnfitrion.apellido}
                          value={editedData.lastname}
                          onChange={handleChange}
                          name="lastname"
                        />
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="formTipoVivienda">
                        <Form.Label>Tipo de Vivienda</Form.Label>
                        <Form.Select
                          value={editedData.tipoDeVivienda}
                          onChange={handleChange}
                          name="tipoDeVivienda"
                        >
                          <option value="departamento">Departamento</option>
                          <option value="casa">Casa</option>
                        </Form.Select>
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="formDistintoDuenio"
                      >
                        <Form.Label>¿Aceptas distinto dueño?</Form.Label>
                        <Form.Select
                          value={editedData.distintoDueño}
                          onChange={handleChange}
                          name="distintoDueño"
                        >
                          <option value="true">Acepto distintos dueños</option>
                          <option value="false">
                            No acepto distintos dueños
                          </option>
                        </Form.Select>
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="formAdmitePerro">
                        <Form.Label>¿Aceptas Perros?</Form.Label>
                        <Form.Select
                          value={editedData.admitePerro}
                          onChange={handleChange}
                          name="admitePerro"
                        >
                          <option value="true">Acepto Perros</option>
                          <option value="false">No acepto Perros</option>
                        </Form.Select>
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="formAdmiteOtros">
                        <Form.Label>¿Aceptas todo tipo de mascotas?</Form.Label>

                        <Form.Select
                          value={editedData.admitAlltypesMascotas}
                          onChange={handleChange}
                          name="admitAlltypesMascotas"
                        >
                          <option value="true">
                            Acepto todo tipo de mascotas
                          </option>
                          <option value="false">
                            No acepto tood tipo de mascotas
                          </option>
                        </Form.Select>
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="formTarifaBase">
                        <Form.Label>¿Cuánto valdrá tu tarifa base?</Form.Label>
                        <InputGroup>
                          <InputGroup.Text>$</InputGroup.Text>
                          <Form.Control
                            type="number"
                            placeholder={datosAnfitrion.tarifaBase}
                            value={editedData.tarifaBase}
                            onChange={(e) => {
                              const value = parseInt(e.target.value); // Convierte el valor a un número entero
                              if (
                                !isNaN(value) &&
                                value >= 0 &&
                                value <= 99999
                              ) {
                                setEditedData({
                                  ...editedData,
                                  tarifaBase: value,
                                });
                              }
                            }}
                            name="tarifaBase"
                            max={99999}
                          />
                        </InputGroup>
                      </Form.Group>
                    </Col>
                  </Row>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseModal}>
                  Cerrar
                </Button>
                <Button variant="primary" onClick={confirmChanges}>
                  Confirmar Cambios
                </Button>
              </Modal.Footer>
            </Modal>
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
              <h3 className="section-title">Mascotas que puedes cuidar</h3>
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
        <Col className="boton-col"></Col>
      </Container>
    </>
  );
};

export default PerfilAnfitrion;
