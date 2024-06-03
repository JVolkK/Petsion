import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import {
  Container,
  Row,
  Col,
  Form,
  FloatingLabel,
  InputGroup,
} from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import LoadingOverlay from "../components/LoadingOverlay";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CardMascotaReserva from "../components/CardMascotaReserva";

const ReservarCuidador = () => {
  const navigate = useNavigate();
  const { cuidadorId } = useParams();
  const [datosCuidador, setDatosCuidador] = useState({});
  const [usuarioLogeadoLocal, setUsuarioLogeadoLocal] = useState({
    mascotas: {},
  });
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    user: null,
    anfitrion: cuidadorId,
    tipoDeServicio: "Alojamiento",
    fechaDeEntrada: null,
    fechaDeSalida: null,
    horarioDeEntrada: null,
    horarioDeSalida: null,
    mascotasCuidado: [],
    mensaje: "",
  });

  const [errors, setErrors] = useState({
    nombre: "",
    edad: "",
    peso: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDateChange = (name, date) => {
    setFormData({
      ...formData,
      [name]: date,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        setLoading(true);
        await axios.post("https://api-petsion.onrender.com/reservas/crear", {
          user: formData.user,
          anfitrion: formData.anfitrion,
          tipoDeServicio: formData.tipoDeServicio,
          fechaDeEntrada: formData.fechaDeEntrada,
          fechaDeSalida: formData.fechaDeSalida,
          horarioDeEntrada: formData.horarioDeEntrada,
          horarioDeSalida: formData.horarioDeSalida,
          mascotasCuidado: formData.mascotasCuidado,
          mensaje: formData.mensaje,
        });

        setFormData({
          user: usuarioLogeadoLocal.id,
          anfitrion: cuidadorId,
          tipoDeServicio: "Alojamiento",
          fechaDeEntrada: null,
          fechaDeSalida: null,
          horarioDeEntrada: null,
          horarioDeSalida: null,
          mascotasCuidado: [],
          mensaje: "",
        });
        setErrors({});
      } catch (error) {
        // Manejo de errores
      } finally {
        setLoading(false);
      }
    }
  };

  const validate = () => {
    let newErrors = {};
    const nombreRegex = /^[a-zA-Z0-9]+$/;
    const edadRegex = /^[0-9]+$/;
    const pesoRegex = /^(?:100(\.0{1,2})?|[1-9]?\d(\.\d{1,2})?|0\.[1-9]\d?)$/;

    if (!nombreRegex.test(formData.nombre)) {
      newErrors.nombre = "El nombre solo puede contener letras y números.";
    }
    if (formData.nombre.length < 1 || formData.nombre.length > 20) {
      newErrors.nombre = "El nombre debe ser de entre 1 y 20 caracteres.";
    }
    if (!edadRegex.test(formData.edad)) {
      newErrors.edad = "La edad solo puede contener números del 0 al 9.";
    }
    if (formData.edad < 1 || formData.edad >= 31) {
      newErrors.edad = "La edad debe ser un número entre 1 y 31.";
    }
    if (!pesoRegex.test(formData.peso)) {
      newErrors.peso = "El peso debe ser un número entre 0.001 y 100.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    //Traer usuario logeado local con localstorage
    const storedUsuarioLogeado = JSON.parse(
      localStorage.getItem("usuarioLogeado")
    );
    if (storedUsuarioLogeado) {
      setUsuarioLogeadoLocal(storedUsuarioLogeado);
    } else {
      navigate("/"); //Volver al home si no hay usuario logeado.
    }

    if (cuidadorId) {
      setLoading(true);
      axios
        .get(`https://api-petsion.onrender.com/anfitrion/${cuidadorId}`)
        .then((response) => {
          // Guardar los datos en el estado
          setDatosCuidador(response.data);
          setLoading(false);
        })
        .catch(() => {
          navigate("/");
        });
    } else {
      setLoading(false);
      navigate("/");
    }
  }, [cuidadorId, navigate]);

  // Este useEffect es clave para guardar el id del usuario dueño que sera usado en el formulario, este detecta si ya fue tomado por el useEffect de arriba, lo guarde en el state y actualiza el componente
  useEffect(() => {
    if (usuarioLogeadoLocal && usuarioLogeadoLocal.id !== formData.user) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        user: usuarioLogeadoLocal.id,
      }));
    }
  }, [usuarioLogeadoLocal, formData.user]);

  // Realizar la solicitud Axios para obtener las mascotas cuando el ID del usuario esté disponible
  useEffect(() => {
    if (usuarioLogeadoLocal && usuarioLogeadoLocal.id !== formData.user) {
      axios
        .post(`https://api-petsion.onrender.com/mascota/listar`, {
          user: usuarioLogeadoLocal.id,
        })
        .then((response) => {
          setUsuarioLogeadoLocal(() => ({
            id: usuarioLogeadoLocal.id,
            rol: usuarioLogeadoLocal.rol,
            mascotas: response.data,
          }));
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        })
        .finally();
    }
  }, [usuarioLogeadoLocal, formData.user]);

  useEffect(() => {
    if (usuarioLogeadoLocal.mascotas) {
      console.log(usuarioLogeadoLocal.mascotas.length);
    }
  }, [usuarioLogeadoLocal]);

  return (
    <>
      <NavBar />

      <Container className="vh-100">
        <LoadingOverlay loading={loading} />
        <Row>
          <h1>
            Reservar a {datosCuidador.name} {datosCuidador.lastname}
          </h1>
        </Row>
        <Row>
          <Form>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="formGroupTipoMascota">
                  <FloatingLabel
                    controlId="floatingSelect"
                    label="Works with selects"
                  >
                    <Form.Select
                      onChange={handleChange}
                      value={formData.tipoDeServicio}
                      name="tipoDeServicio"
                    >
                      <option value="Alojamiento">Alojamiento</option>
                      <option value="Cuidado de día">Cuidado de día</option>
                      <option value="Paseo">Paseo</option>
                    </Form.Select>
                  </FloatingLabel>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col xl={5}>
                <Form.Group className="mb-3" controlId="formGroupFechaEntrada">
                  <Form.Label>Fecha de entrada</Form.Label>
                  <InputGroup className="mb-3 " name="fechaDeEntrada">
                    <DatePicker
                      selected={formData.fechaDeEntrada}
                      onChange={(date) =>
                        handleDateChange("fechaDeEntrada", date)
                      }
                      dateFormat="dd/MM/yyyy"
                      className="form-control"
                      name="fechaDeEntrada"
                      minDate={new Date()}
                    />
                  </InputGroup>
                </Form.Group>
              </Col>
              <Col xl={5}>
                <Form.Group className="mb-3" controlId="formGroupFechaEntrada">
                  <Form.Label>Fecha de salida</Form.Label>
                  <InputGroup className="mb-3" name="fechaDeSalida">
                    <DatePicker
                      selected={formData.fechaDeSalida}
                      onChange={(date) =>
                        handleDateChange("fechaDeSalida", date)
                      }
                      dateFormat="dd/MM/yyyy"
                      className="form-control"
                      name="fechaDeSalida"
                      minDate={new Date()}
                    />
                  </InputGroup>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col xl={5} className="">
                <Form.Group
                  className="mb-3 "
                  controlId="formGroupHorarioEntrada"
                >
                  <Form.Label>Horario de entrada</Form.Label>
                  <InputGroup className="mb-3">
                    <DatePicker
                      selected={formData.horarioDeEntrada}
                      onChange={(date) =>
                        handleDateChange("horarioDeEntrada", date)
                      }
                      showTimeSelect
                      showTimeSelectOnly
                      timeIntervals={30}
                      timeCaption="Hora"
                      dateFormat="h:mm aa"
                      className="form-control"
                      name="horarioDeEntrada"
                      minDate={new Date()} // Restringe la selección a fechas a partir de hoy
                    />
                  </InputGroup>
                </Form.Group>
              </Col>
              <Col xl={5}>
                <Form.Group className="mb-3" controlId="formGroupHorarioSalida">
                  <Form.Label>Horario de salida</Form.Label>
                  <InputGroup className="mb-3">
                    <DatePicker
                      selected={formData.horarioDeSalida}
                      onChange={(date) =>
                        handleDateChange("horarioDeSalida", date)
                      }
                      showTimeSelect
                      showTimeSelectOnly
                      timeIntervals={30}
                      timeCaption="Hora"
                      dateFormat="h:mm aa"
                      className="form-control"
                      name="horarioDeSalida"
                      minDate={new Date()} // Restringe la selección a fechas a partir de hoy
                    />
                  </InputGroup>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col xl={12}>
                <Form.Group className="mb-3" controlId="formGroupMascotas">
                  <Form.Label>¿A que mascota cuidará?</Form.Label>
                  <Row>
                    {usuarioLogeadoLocal.mascotas &&
                    usuarioLogeadoLocal.mascotas.length > 0 ? (
                      usuarioLogeadoLocal.mascotas.map((mascota, index) => (
                        <Col>
                          <Form.Check
                            className="border"
                            inline
                            label={
                              <CardMascotaReserva
                                nombre={mascota.nombre}
                                tipoMascota={mascota.tipoMascota}
                              />
                            }
                            name={mascota.nombre}
                            type="checkbox"
                            id={index}
                          ></Form.Check>
                        </Col>
                      ))
                    ) : (
                      <h1>No hay mascota</h1>
                    )}
                  </Row>
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default ReservarCuidador;
