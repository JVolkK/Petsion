import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Container,
  Row,
  Col,
  Form,
  FloatingLabel,
  InputGroup,
  Button,
} from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import LoadingOverlay from "../components/LoadingOverlay";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CardMascotaReserva from "../components/CardMascotaReserva";
import AddPetCard from "../components/AddPetCard";
import "../styles/ReservarCuidador.css";

const ReservarCuidador = () => {
  const navigate = useNavigate();
  const { cuidadorId } = useParams();
  const [datosCuidador, setDatosCuidador] = useState({});
  const [usuarioLogeadoLocal, setUsuarioLogeadoLocal] = useState({
    mascotas: {},
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [highlightedDates, setHighlightedDates] = useState([]);
  const [formData, setFormData] = useState({
    user: usuarioLogeadoLocal.id,
    anfitrion: cuidadorId,
    tipoDeServicio: null,
    fechaDeEntrada: null,
    fechaDeSalida: null,
    horarioDeEntrada: null,
    horarioDeSalida: null,
    mascotasCuidado: [],
    mensaje: "",
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
          tipoDeServicio: null,
          fechaDeEntrada: null,
          fechaDeSalida: null,
          horarioDeEntrada: null,
          horarioDeSalida: null,
          mascotasCuidado: [],
          mensaje: "",
        });
        setErrors({});
        alert("Reserva generada con exito, puedes verlas en Mis reservas");
      } catch (error) {
        setLoading(false);
        alert("Algo salio mal, intentalo de nuevo mas tarde.");
        // Manejo de errores
      } finally {
        setLoading(false);
        navigate("/reservas-duenio");
      }
    }
  };

  const validate = () => {
    let newErrors = {};
    const mensajeTest = /^[a-zA-Z0-9\s\-!@#$%^&*(),.?"':;]+$/;

    if (formData.tipoDeServicio === null && "") {
      newErrors.tipoDeServicio = "Ingrese un tipo de servicio";
    }
    if (formData.fechaDeEntrada === null) {
      newErrors.fechaDeEntrada = "Seleccione una fecha de entrada.";
    }
    if (formData.fechaDeSalida === null) {
      newErrors.fechaDeSalida = "Seleccione una fecha de salida";
    }
    if (formData.horarioDeEntrada === null) {
      newErrors.horarioDeEntrada = "Seleccione un horario de entrada";
    }
    if (formData.horarioDeSalida === null) {
      newErrors.horarioDeSalida = "Seleccione un horario de salida";
    }

    if (formData.mascotasCuidado.length === 0) {
      newErrors.mascotasCuidado = "Elige una mascota para tu reserva.";
    } else if (
      formData.mascotasCuidado.length > datosCuidador.cantidadDeAnimales
    ) {
      newErrors.mascotasCuidado = `${datosCuidador.name} cuida un maximo de ${datosCuidador.cantidadDeAnimales} mascotas.`;
    }

    if (formData.mensaje === null || formData.mensaje === "") {
      newErrors.mensaje = "Debe ingresar un mensaje.";
    } else if (!mensajeTest.test(formData.mensaje)) {
      newErrors.mensaje = "No se aceptan caracteres especiales.";
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
        })
        .catch(() => {
          setLoading(false);
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
    if (
      datosCuidador.disponibilidadAlojamiento ||
      datosCuidador.disponibilidadPaseo ||
      datosCuidador.disponibilidadVisita
    ) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        tipoDeServicio: datosCuidador.disponibilidadAlojamiento
          ? "Alojamiento"
          : datosCuidador.disponibilidadVisita
          ? "Cuidado de día"
          : datosCuidador.disponibilidadPaseo
          ? "Paseo"
          : "",
      }));
    }
  }, [datosCuidador]);

  useEffect(() => {
    if (datosCuidador) {
      const daysMap = {
        disponibilidadlunes: 1,
        disponibilidadmartes: 2,
        disponibilidadmiercoles: 3,
        disponibilidadjueves: 4,
        disponibilidadviernes: 5,
        disponibilidadsabado: 6,
        disponibilidaddomingo: 0,
      };

      const today = new Date();
      const highlighted = [];

      Object.keys(daysMap).forEach((key) => {
        if (datosCuidador[key] === true) {
          // Verificación explícita de true
          for (let i = 0; i < 60; i++) {
            // Asumiendo que deseamos resaltar los días en los próximos 30 días
            const current = new Date();
            current.setDate(today.getDate() + i);
            if (current.getDay() === daysMap[key]) {
              highlighted.push(new Date(current)); // Crear nueva instancia para evitar problemas de referencia
            }
          }
        }
      });

      setHighlightedDates(highlighted);
    }
  }, [datosCuidador]);

  const CustomInput = React.forwardRef(
    ({ value, onClick, onChange, isInvalid }, ref) => (
      <Form.Control
        type="text"
        onClick={onClick}
        onChange={onChange}
        value={value}
        isInvalid={isInvalid}
        ref={ref}
      />
    )
  );

  return (
    <>
      <NavBar />

      <Container className="h-100 p-auto m-auto">
        <LoadingOverlay loading={loading} />

        <Row>
          <h1 className="my-4">
            Reservar a {datosCuidador.name} {datosCuidador.lastname}
          </h1>
        </Row>
        <Row>
          <Form onSubmit={handleSubmit}>
            <Row className="my-2">
              <Col>
                <h5>Selecciona un servicio:</h5>
                <Form.Group className="mb-3" controlId="formGroupTipoMascota">
                  <FloatingLabel
                    controlId="floatingSelect"
                    label={`Servicios que ofrece ${datosCuidador.name}`}
                  >
                    <Form.Select
                      onChange={handleChange}
                      value={formData.tipoDeServicio}
                      name="tipoDeServicio"
                    >
                      {datosCuidador.disponibilidadAlojamiento ? (
                        <option value="Alojamiento">Alojamiento</option>
                      ) : null}
                      {datosCuidador.disponibilidadVisita ? (
                        <option value="Cuidado de día">Cuidado de día</option>
                      ) : null}
                      {datosCuidador.disponibilidadPaseo ? (
                        <option value="Paseo">Paseo</option>
                      ) : null}
                    </Form.Select>
                  </FloatingLabel>
                </Form.Group>
              </Col>
            </Row>
            <Row className="my-2">
              <h5>Selecciona fechas:</h5>
              <Form.Text id="passwordHelpBlock" muted>
                En verde podras ver los dias en los que trabaja{" "}
                {datosCuidador.name} {datosCuidador.lastname}
              </Form.Text>
              <Col xl={5}>
                <Form.Group
                  className="mb-3 my-2"
                  controlId="formGroupFechaEntrada"
                >
                  <Form.Label>Fecha de entrada</Form.Label>
                  <InputGroup className="mb-3" name="fechaDeEntrada">
                    <DatePicker
                      showIcon
                      selected={formData.fechaDeEntrada}
                      onChange={(date) =>
                        handleDateChange("fechaDeEntrada", date)
                      }
                      dateFormat="dd/MM/yyyy"
                      className="form-control"
                      name="fechaDeEntrada"
                      minDate={new Date()}
                      highlightDates={highlightedDates}
                      customInput={
                        <CustomInput isInvalid={!!errors.fechaDeEntrada} />
                      }
                    />
                  </InputGroup>
                </Form.Group>
              </Col>
              <Col xl={5}>
                <Form.Group
                  className="mb-3 my-2"
                  controlId="formGroupFechaSalida"
                >
                  <Form.Label>Fecha de salida</Form.Label>
                  <InputGroup className="mb-3" name="fechaDeSalida">
                    <DatePicker
                      showIcon
                      selected={formData.fechaDeSalida}
                      onChange={(date) =>
                        handleDateChange("fechaDeSalida", date)
                      }
                      dateFormat="dd/MM/yyyy"
                      className="form-control"
                      name="fechaDeSalida"
                      minDate={new Date()}
                      highlightDates={highlightedDates}
                      customInput={
                        <CustomInput isInvalid={!!errors.fechaDeSalida} />
                      }
                    />
                  </InputGroup>
                </Form.Group>
              </Col>
            </Row>
            <Row className="my-2">
              <h5>Selecciona los horarios:</h5>
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
                      customInput={
                        <CustomInput isInvalid={!!errors.horarioDeEntrada} />
                      }
                    />
                  </InputGroup>
                </Form.Group>
              </Col>
              <Col xl={5}>
                <Form.Group className="mb-3" controlId="formGroupHorarioSalida">
                  <Form.Label>Horario de salida</Form.Label>
                  <InputGroup className="mb-3">
                    <DatePicker
                      isInvalid={!!errors.horarioDeSalida}
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
                      customInput={
                        <CustomInput isInvalid={!!errors.horarioDeSalida} />
                      }
                    />
                  </InputGroup>
                </Form.Group>
              </Col>
            </Row>
            <Row className="my-2">
              <Col xl={12} className="">
                <Form.Group className="mb-3" controlId="formGroupMascotas">
                  <h5>¿A que mascota cuidará?</h5>

                  <p className="text-error">{errors.mascotasCuidado}</p>

                  <Row className="w-100 scrollable-row">
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
                            name="mascotasCuidado"
                            type="checkbox"
                            id={mascota._id}
                            value={mascota._id}
                            onChange={(e) => {
                              const { checked, value } = e.target;
                              setFormData((prevFormData) => {
                                const updatedMascotas = checked
                                  ? [...prevFormData.mascotasCuidado, value]
                                  : prevFormData.mascotasCuidado.filter(
                                      (id) => id !== value
                                    );
                                return {
                                  ...prevFormData,
                                  mascotasCuidado: updatedMascotas,
                                };
                              });
                            }}
                          ></Form.Check>
                        </Col>
                      ))
                    ) : (
                      <AddPetCard />
                    )}
                  </Row>
                </Form.Group>
              </Col>
              <Row className="my-4">
                <Col>
                  <Form.Group className="mb-3">
                    <div className="d-flex justify-content-start">
                      <h5>Mensaje para el cuidador</h5>
                      {/* <Form.Text muted> (opcional)</Form.Text> */}
                    </div>
                    <Form.Control
                      maxLength={100}
                      name="mensaje"
                      onChange={handleChange}
                      value={formData.mensaje}
                      as="textarea"
                      placeholder="Indica cuidados especiales, si llevas o no su propio alimento, cosas a tener en cuenta, etc"
                      rows={4}
                      style={{ resize: "none" }}
                      isInvalid={!!errors.mensaje}
                    />
                    <p className="text-error">{errors.mensaje}</p>
                  </Form.Group>
                </Col>
              </Row>
            </Row>
            <Row className="d-flex justify-content-center">
              <Col xl={6} className="d-flex justify-content-center pt-3 py-5">
                <Button
                  type="submit"
                  style={{ backgroundColor: "#4E75B5", borderColor: "#324c75" }}
                  className="w-100"
                >
                  Enviar reserva
                </Button>
              </Col>
            </Row>
          </Form>
        </Row>
      </Container>
    </>
  );
};

export default ReservarCuidador;
