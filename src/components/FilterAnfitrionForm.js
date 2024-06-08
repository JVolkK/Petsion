import React, { useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { AppContext } from "../contexts/AppContext";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import { useForm } from "../hooks/useFormFiltroAnfitrion";
import Button from "react-bootstrap/Button";

const FilterAnfitrionForm = ({ loading, setLoading }) => {
  const { homeFormValue } = useContext(AppContext);

  const initialForm = {
    admitePerro: true,
    admiteGato: false,
    admiteAlltypesMascotas: false,
    disponibilidadAlojamiento: true,
    disponibilidadPaseo: false,
    disponibilidadVisita: false,
    disponibilidadlunes: true,
    disponibilidadmartes: false,
    disponibilidadmiercoles: false,
    disponibilidadjueves: false,
    disponibilidadviernes: false,
    disponibilidadsabado: false,
    disponibilidaddomingo: false,
    disponibilidadHoraria: "Mañana",
  };

  const { handleSubmit, handleChange } = useForm(initialForm, setLoading);

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Container>
          <Row className="justify-content-center">
            <Col xl="3" md="6">
              <Form.Group controlId="formServicios">
                <Form.Label>Servicios</Form.Label>
                <Form.Control
                  as="select"
                  name="servicio"
                  defaultValue={homeFormValue}
                  onChange={handleChange}
                  disabled={loading}
                >
                  <option value="alojamiento">Alojamiento</option>
                  <option value="cuidado-dia">Cuidado de día</option>
                  <option value="paseo">Paseo</option>
                </Form.Control>
              </Form.Group>
            </Col>
            <Col xl="3" md="6">
              <Form.Group controlId="formMascotas">
                <Form.Label>Mascotas</Form.Label>
                <Form.Control
                  as="select"
                  name="tipoMascotaAdmite"
                  onChange={handleChange}
                  disabled={loading}
                >
                  <option value="admitePerro">Perro</option>
                  <option value="admiteGato">Gato</option>
                  <option value="admiteAlltypesMascotas">Otros</option>
                </Form.Control>
              </Form.Group>
            </Col>
            <Col xl="3" md="6">
              <Form.Group controlId="formDiaSemana">
                <Form.Label>¿En que dia de la semana?</Form.Label>
                <Form.Control
                  as="select"
                  name="disponibilidadSemana"
                  onChange={handleChange}
                  disabled={loading}
                >
                  <option value="lunes">Lunes</option>
                  <option value="martes">Martes</option>
                  <option value="miercoles">Miercoles</option>
                  <option value="jueves">Jueves</option>
                  <option value="viernes">Viernes</option>
                  <option value="sabado">Sabado</option>
                  <option value="domingo">Domingo</option>
                </Form.Control>
              </Form.Group>
            </Col>
            <Col xl="3" md="6">
              <Form.Group controlId="formDiaSemana">
                <Form.Label>Disponibilidad horaria</Form.Label>
                <Form.Control
                  as="select"
                  name="disponibilidadHoraria"
                  onChange={handleChange}
                  disabled={loading}
                >
                  <option value="Mañana">Mañana</option>
                  <option value="Tarde">Tarde</option>
                  <option value="Noche">Noche</option>
                  <option value="Fulltime">Fulltime</option>
                  <option value="Variable">Variable</option>
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col className="d-flex justify-content-center  m-auto pt-3">
              <Button type="submit">Buscar</Button>
            </Col>
          </Row>
        </Container>
      </Form>
    </div>
  );
};

export default FilterAnfitrionForm;
