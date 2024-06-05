import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Row, Col, InputGroup, Container } from "react-bootstrap";

import AutocompleteAddress from "./AutocompleteAddress";
const Step2RegistrationAnfitrion = ({
  form,
  handleChange,
  handleBlur,
  errors,
  submitPressed,
  handleAddressSelect,
  styles,
}) => {
  return (
    <Container>
      <Row className="mb-3">
        <Form.Group as={Col} md="4">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            required
            maxLength="15"
            minLength={3}
            type="text"
            placeholder="Nombre/s"
            name="nombre"
            onBlur={handleBlur}
            onChange={handleChange}
            value={form.nombre}
          />
          {submitPressed === true && errors.nombre && (
            <p style={styles}>{errors.nombre}</p>
          )}
        </Form.Group>

        <Form.Group as={Col} md="4">
          <Form.Label>Apellido</Form.Label>
          <Form.Control
            maxLength="15"
            minLength={3}
            required
            type="text"
            placeholder="Apellido/s"
            name="apellido"
            onBlur={handleBlur}
            onChange={handleChange}
            value={form.apellido}
          />
          {submitPressed === true && errors.apellido && (
            <p style={styles}>{errors.apellido}</p>
          )}
        </Form.Group>

        <Form.Group as={Col} md="4">
          <Form.Label>DNI</Form.Label>
          <InputGroup>
            <Form.Control
              className="inputStyle"
              min="1000000"
              max="70000000"
              type="number"
              placeholder="DNI"
              required
              name="dni"
              onBlur={handleBlur}
              onChange={handleChange}
              value={form.dni}
            />
            {submitPressed === true && errors.dni && (
              <p style={styles}>{errors.dni}</p>
            )}
          </InputGroup>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md="4">
          <Form.Label>Fecha de nacimiento</Form.Label>
          <Form.Control
            className="inputStyle"
            type="date"
            max="2005-01-01"
            min="1920-01-01"
            required
            name="fechaDeNacimiento"
            onBlur={handleBlur}
            onChange={handleChange}
            value={form.fechaDeNacimiento}
          />
          {submitPressed === true && errors.fechaDeNacimiento && (
            <p style={styles}>{errors.fechaDeNacimiento}</p>
          )}
        </Form.Group>
        <Form.Group as={Col} md="4">
          <Form.Label>Numero de telefono</Form.Label>
          <Form.Control
            className="inputStyle"
            type="number"
            placeholder="Numero de telefono"
            required
            name="numeroDeTelefono"
            onBlur={handleBlur}
            onChange={handleChange}
            value={form.numeroDeTelefono}
          />
          {submitPressed === true && errors.numeroDeTelefono && (
            <p style={styles}>{errors.numeroDeTelefono}</p>
          )}
        </Form.Group>
        <Form.Group as={Col} md="4">
          <Form.Label>Direccion</Form.Label>
          <AutocompleteAddress onSelect={handleAddressSelect} />
        </Form.Group>
      </Row>
    </Container>
  );
};

export default Step2RegistrationAnfitrion;
