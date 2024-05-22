import React from "react";
import { Form, Row, Col, InputGroup, Container } from "react-bootstrap";
import "../styles/registrationAnfitrionForm.css";

const Step1RegistrationAnfitrion = ({
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
          <Form.Label>Nombre de usuario</Form.Label>
          <Form.Control
            maxLength="15"
            minLength={5}
            type="text"
            name="username"
            placeholder="Escribe tu nombre de usuario"
            onBlur={handleBlur}
            onChange={handleChange}
            value={form.username}
            required
          />
          {submitPressed === true && errors.username && (
            <p style={styles}>{errors.username}</p>
          )}
        </Form.Group>

        <Form.Group as={Col} md="4">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            className="inputStyle mb-0"
            required
            maxLength="15"
            type="password"
            name="password"
            placeholder="Escribe tu contraseña"
            onBlur={handleBlur}
            onChange={handleChange}
            value={form.password}
          />
          {submitPressed && errors.password ? (
            // Si hay errores, muestra el mensaje de error
            <p style={styles}>{errors.password}</p>
          ) : (
            // Si no hay errores, muestra el label
            <p className="text-muted password-condition">
              La contraseña debe contener al menos una mayuscula, minimo 10
              caracteres y no contener espacios
            </p>
          )}
        </Form.Group>
        <Form.Group as={Col} md="4">
          <Form.Label>Correo electronico</Form.Label>
          <Form.Control
            className="inputStyle"
            required
            type="email"
            name="email"
            placeholder="Escribe tu correo electronico"
            onBlur={handleBlur}
            onChange={handleChange}
            value={form.email}
          />
          {submitPressed === true && errors.email && (
            <p style={styles}>{errors.email}</p>
          )}
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md="3">
          <Form.Label>Disponibilidad horaria</Form.Label>
          <Form.Control
            as="select"
            className="inputStyle"
            name="disponibilidadHoraria"
            defaultValue="Mañana"
            onBlur={handleBlur}
            onChange={handleChange}
            value={form.disponibilidadHoraria}
            required
          >
            <option value="Mañana">Mañana</option>
            <option value="Tarde">Tarde</option>
            <option value="Noche">Noche</option>
            <option value="Fulltime">Fulltime</option>
            <option value="Variable">Variable</option>
          </Form.Control>
        </Form.Group>
        <Form.Group as={Col} md="5">
          <Form.Label className="howManyAnimals">
            Cantidad de animales que cuidarias
          </Form.Label>
          <InputGroup>
            <Form.Control
              className="inputStyle"
              min="1"
              max="10"
              type="number"
              placeholder="¿Cuantos animales cuidarias?"
              required
              name="cantidadDeAnimales"
              onBlur={handleBlur}
              onChange={handleChange}
              value={form.cantidadDeAnimales}
            />
            {submitPressed === true && errors.cantidadDeAnimales && (
              <p style={styles}>{errors.cantidadDeAnimales}</p>
            )}
          </InputGroup>
        </Form.Group>
        <Form.Group as={Col} md="4">
          <Form.Label>Tarifa base diaria</Form.Label>
          <InputGroup>
            <Form.Control
              className="inputStyle"
              min="1"
              max="1000000"
              type="number"
              placeholder="¿Cuanto quieres cobrar por dia?"
              required
              name="tarifaBase"
              onBlur={handleBlur}
              onChange={handleChange}
              value={form.tarifaBase}
            />
            {submitPressed === true && errors.tarifaBase && (
              <p style={styles}>{errors.tarifaBase}</p>
            )}
          </InputGroup>
        </Form.Group>
      </Row>
    </Container>
  );
};

export default Step1RegistrationAnfitrion;
