import React from "react";
import { Form, Row, Col, Container } from "react-bootstrap";

const Step3RegistrationAnfitrion = ({
  form,
  handleChange,
  handleBlur,
  errors,
  submitPressed,
  styles,
}) => {
  return (
    <Container>
      <Row className="mb-3">
        <Form.Group as={Col} md="4">
          <Form.Label>Tipo de vivienda</Form.Label>
          <Form.Control
            as="select"
            className="inputStyle"
            name="tipoDeVivienda"
            onBlur={handleBlur}
            onChange={handleChange}
            value={form.tipoDeVivienda}
            required
          >
            <option value="casa">Casa</option>
            <option value="departamento">Departamento</option>
          </Form.Control>
        </Form.Group>
        <Form.Group as={Col} md="4">
          <Form.Label>Tiene patio</Form.Label>
          <Form.Control
            as="select"
            className="inputStyle"
            name="conPatio"
            defaultValue={false}
            onBlur={handleBlur}
            onChange={handleChange}
            value={form.conPatio}
            required
          >
            <option value={true}>Si</option>
            <option value={false}>No</option>
          </Form.Control>
        </Form.Group>
        <Form.Group as={Col} md="4">
          <Form.Label>Codigo postal</Form.Label>
          <Form.Control
            min="100"
            max="10000"
            minLength={1}
            maxLength={6}
            className="inputStyle"
            type="number"
            placeholder="Codigo Postal"
            required
            name="codigoPostal"
            onBlur={handleBlur}
            onChange={handleChange}
            value={form.codigoPostal}
          />
          {submitPressed === true && errors.codigoPostal && (
            <p style={styles}>{errors.codigoPostal}</p>
          )}
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md="4">
          <Form.Label>Tipo de mascotas que cuida</Form.Label>
          <Form.Check
            type="checkbox"
            label="Perros"
            name="admitePerro"
            defaultValue={false}
            checked={form.admitePerro || form.admiteAlltypesMascotas}
            onChange={handleChange}
          />
          <Form.Check
            type="checkbox"
            label="Gatos"
            name="admiteGato"
            defaultValue={false}
            checked={form.admiteGato || form.admiteAlltypesMascotas}
            onChange={handleChange}
          />
          <Form.Check
            type="checkbox"
            label="Todos (tortuga, pez, iguana, conejo, arañas, aves, roedores, perros y gatos)"
            name="admiteAlltypesMascotas"
            defaultValue={false}
            checked={form.admiteAlltypesMascotas}
            onChange={handleChange}
          />
          {submitPressed === true &&
            errors.admiteGato &&
            errors.admitePerro &&
            errors.admiteAlltypesMascotas && (
              <p style={styles}>
                {errors.admiteGato ||
                  errors.admitePerro ||
                  errors.admiteAlltypesMascotas}
              </p>
            )}
        </Form.Group>
        <Form.Group as={Col} md="4">
          <Form.Label>¿Que servicios ofrecerias?</Form.Label>
          <Form.Check
            type="checkbox"
            label="Alojamiento"
            name="disponibilidadAlojamiento"
            defaultValue={false}
            checked={form.disponibilidadAlojamiento}
            onChange={handleChange}
          />
          <Form.Check
            type="checkbox"
            label="Cuidado de dia"
            name="disponibilidadVisita"
            defaultValue={false}
            checked={form.disponibilidadVisita}
            onChange={handleChange}
          />
          <Form.Check
            type="checkbox"
            label="Paseo"
            name="disponibilidadPaseo"
            defaultValue={false}
            checked={form.disponibilidadPaseo}
            onChange={handleChange}
          />
          {submitPressed === true &&
            errors.disponibilidadVisita &&
            errors.disponibilidadAlojamiento &&
            errors.disponibilidadPaseo && (
              <p style={styles}>{errors.disponibilidadPaseo}</p>
            )}
        </Form.Group>
        <Form.Group as={Col} md="4">
          <Form.Label>¿Que dias de la semana estas disponible?</Form.Label>
          <Form.Check
            type="checkbox"
            label="Lunes"
            name="disponibilidadlunes"
            defaultValue={false}
            checked={form.disponibilidadlunes}
            onChange={handleChange}
          />
          <Form.Check
            type="checkbox"
            label="Martes"
            name="disponibilidadmartes"
            defaultValue={false}
            checked={form.disponibilidadmartes}
            onChange={handleChange}
          />
          <Form.Check
            type="checkbox"
            label="Miercoles"
            name="disponibilidadmiercoles"
            defaultValue={false}
            checked={form.disponibilidadmiercoles}
            onChange={handleChange}
          />
          <Form.Check
            type="checkbox"
            label="Jueves"
            name="disponibilidadjueves"
            defaultValue={false}
            checked={form.disponibilidadjueves}
            onChange={handleChange}
          />
          <Form.Check
            type="checkbox"
            label="Viernes"
            name="disponibilidadviernes"
            defaultValue={false}
            checked={form.disponibilidadviernes}
            onChange={handleChange}
          />
          <Form.Check
            type="checkbox"
            label="Sabado"
            name="disponibilidadsabado"
            defaultValue={false}
            checked={form.disponibilidadsabado}
            onChange={handleChange}
          />
          <Form.Check
            type="checkbox"
            label="Domingo"
            name="disponibilidaddomingo"
            defaultValue={false}
            checked={form.disponibilidaddomingo}
            onChange={handleChange}
          />
          {submitPressed === true && errors.disponibilidadlunes && (
            <p style={styles}>{errors.disponibilidadlunes}</p>
          )}
        </Form.Group>
      </Row>
      <Row className="mb-5">
        <Form.Group as={Col} md="4">
          <Form.Label>¿Aceptas mascotas de distintos dueños?</Form.Label>
          <Form.Control
            as="select"
            className="inputStyle"
            name="distintoDueño"
            defaultValue={false}
            onBlur={handleBlur}
            onChange={handleChange}
            value={form.distintoDueño}
            required
          >
            <option value={true}>Si</option>
            <option value={false}>No</option>
          </Form.Control>
        </Form.Group>
      </Row>
    </Container>
  );
};

export default Step3RegistrationAnfitrion;
