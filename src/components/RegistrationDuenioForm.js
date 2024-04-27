import { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import { useForm } from "../hooks/useForm";

const initialForm = {
  //Valores base para el state de Form en el hook perzonalizado useForm
  username: "",
  password: "",
  email: "",
  nombre: "",
  apellido: "",
  dni: "",
  fechaDeNacimiento: "",
  numeroDeTelefono: "",
  codigoPostal: "",
};

const validationsForm = (form) => {
  // Aqui van todas las validaciones de cada input del formulario
  let errors = {};

  //Validaciones username
  if (!form.username.trim()) {
    errors.username = "El campo nombre de usuario es requerido.";
  }

  //Validaciones password
  if (!form.password.trim()) {
    errors.password = "El campo contraseña es requerido";
  }

  //Validaciones
  if (!form.email.trim()) {
    errors.email = "El campo de correo electronico es requerido ";
  }

  //Validaciones nombre
  if (!form.nombre.trim()) {
    errors.nombre = "El campo de nombre es requerido ";
  } else if (!namePattern.test(form.nombre)) {
    errors.nombre = "El campo de nombre es invalido";
  }

  //Validaciones apellido
  if (!form.apellido.trim()) {
    errors.apellido = "El campo de apellido es requerido";
  } else if (!namePattern.test(form.apellido)) {
    errors.apellido = "El campo de apellido es invalido";
  }

  //Validaciones dni
  if (!form.dni) {
    errors.dni = "El campo de dni es requerido";
  } else if (form.dni > 70000000 || form.dni < 1) {
    errors.dni = "El campo de dni es invalido";
  }

  //Validaciones fecha de nacimiento
  if (!form.fechaDeNacimiento) {
    errors.fechaDeNacimiento = "El campo de fecha de nacimiento es requerido";
  }

  //Validaciones numero de telefono
  if (!form.numeroDeTelefono) {
    errors.numeroDeTelefono = "El campo de numero de telefono es requerido";
  } else if (
    form.numeroDeTelefono > 9999999999 ||
    form.numeroDeTelefono < 999999999
  ) {
    errors.numeroDeTelefono = "El campo de numero de telefono es invalido";
  }

  //Validaciones codigo postal
  if (!form.codigoPostal) {
    errors.codigoPostal = "El campo de codigo postal es requerido";
  } else if (form.codigoPostal > 9999 || form.codigoPostal < 1) {
    errors.codigoPostal = "El campo de codigo postal es invalido";
  }

  return errors; // Esta variable error viene y se usa en el useForm
};

let styles = {
  // Estilo para los mensajes de error
  fontWeight: "bold",
  color: "#dc3545",
};

var namePattern = /^[a-zA-Z\s-]+$/;

function RegistrationDuenioForm() {
  const {
    form,
    errors,
    loading,
    response,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useForm(initialForm, validationsForm); // Llamamos a useForm y extraemos de el todos los estados y funciones que utilizaremos

  return (
    <Form onSubmit={handleSubmit} className="p-5">
      <Row className="mb-3">
        <Form.Group as={Col} md="4">
          <Form.Label>Nombre de Usuario</Form.Label>
          <Form.Control
            maxLength="15"
            type="text"
            name="username"
            placeholder="Escribe tu nombre de usuario"
            onBlur={handleBlur}
            onChange={handleChange}
            value={form.username}
            required
          />
          {errors.username && <p style={styles}>{errors.username}</p>}
        </Form.Group>

        <Form.Group as={Col} md="4">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            required
            maxLength="15"
            type="password"
            name="password"
            placeholder="Escribe tu contraseña"
            onBlur={handleBlur}
            onChange={handleChange}
            value={form.password}
          />
          {errors.password && <p style={styles}>{errors.password}</p>}
        </Form.Group>
        <Form.Group as={Col} md="4">
          <Form.Label>Correo electronico</Form.Label>
          <Form.Control
            required
            type="email"
            name="email"
            placeholder="Escribe tu correo electronico"
            onBlur={handleBlur}
            onChange={handleChange}
            value={form.email}
          />
          {errors.email && <p style={styles}>{errors.email}</p>}
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md="4">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            required
            maxLength="15"
            type="text"
            placeholder="Primer nombre"
            name="nombre"
            onBlur={handleBlur}
            onChange={handleChange}
            value={form.nombre}
          />
          {errors.nombre && <p style={styles}>{errors.nombre}</p>}
        </Form.Group>

        <Form.Group as={Col} md="4">
          <Form.Label>Apellido</Form.Label>
          <Form.Control
            maxLength="15"
            required
            type="text"
            placeholder="Apellido/s"
            name="apellido"
            onBlur={handleBlur}
            onChange={handleChange}
            value={form.apellido}
          />
          {errors.apellido && <p style={styles}>{errors.apellido}</p>}
        </Form.Group>

        <Form.Group as={Col} md="4">
          <Form.Label>DNI</Form.Label>
          <InputGroup>
            <Form.Control
              min="1"
              max="70000000"
              type="number"
              placeholder="DNI"
              required
              name="dni"
              onBlur={handleBlur}
              onChange={handleChange}
              value={form.dni}
            />
            {errors.dni && <p style={styles}>{errors.dni}</p>}
            <Form.Control.Feedback type="invalid">
              Ingrese un numero de DNI valido.
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md="4">
          <Form.Label>Fecha de nacimiento</Form.Label>
          <Form.Control
            type="date"
            max="2005-01-01"
            min="1920-01-01"
            required
            name="fechaDeNacimiento"
            onBlur={handleBlur}
            onChange={handleChange}
            value={form.fechaDeNacimiento}
          />
          {errors.fechaDeNacimiento && (
            <p style={styles}>{errors.fechaDeNacimiento}</p>
          )}
          <Form.Control.Feedback type="invalid">
            Cargue una fecha de nacimiento valida
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4">
          <Form.Label>Numero de telefono</Form.Label>
          <Form.Control
            type="number"
            placeholder="Numero de telefono"
            required
            name="numeroDeTelefono"
            onBlur={handleBlur}
            onChange={handleChange}
            value={form.numeroDeTelefono}
          />
          {errors.numeroDeTelefono && (
            <p style={styles}>{errors.numeroDeTelefono}</p>
          )}
          <Form.Control.Feedback type="invalid">
            Cargue un numero de telefono valido
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4">
          <Form.Label>Codigo postal</Form.Label>
          <Form.Control
            type="number"
            placeholder="Codigo Postal"
            required
            name="codigoPostal"
            onBlur={handleBlur}
            onChange={handleChange}
            value={form.codigoPostal}
          />
          {errors.codigoPostal && <p style={styles}>{errors.codigoPostal}</p>}
        </Form.Group>
      </Row>
      <Form.Group className="mb-3">
        <Form.Check
          required
          label="Aceptar terminos y condiciones"
          feedback="Debes aceptar los terminos y condiciones antes de continuar."
          feedbackType="invalid"
        />
      </Form.Group>
      <Button type="submit">Enviar</Button>
    </Form>
  );
}

export default RegistrationDuenioForm;
