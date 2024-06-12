import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import lentes from "../images/lentes.jpg";

const FormContac = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    // Verifica si el campo de nombre excede los 40 caracteres antes de actualizar el estado
    if (e.target.name === "name" && e.target.value.length > 40) {
      return;
    }
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Limpia el formulario después de enviar
    setFormData({
      name: "",
      email: "",
      message: "",
    });
  };

  return (
    <>
      <Container fluid className="p-0">
        <img className="d-block w-100" src={lentes} alt="Contacto" />
        <br />
      </Container>
      <Container>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formName">
            <Form.Label>Nombre:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese su nombre"
              name="name"
              value={formData.name}
              onChange={handleChange}
              maxLength={40} // Limita la cantidad de caracteres a 40
            />
          </Form.Group>
          <Form.Group controlId="formEmail">
            <Form.Label>Correo electrónico:</Form.Label>
            <Form.Control
              type="email"
              placeholder="Ingrese su correo electrónico"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formMessage">
            <Form.Label>Mensaje:</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Escribe tu mensaje aquí"
              name="message"
              value={formData.message}
              onChange={handleChange}
            />
          </Form.Group>
          <br></br>
          <Button variant="primary" type="submit">
            Enviar
          </Button>
        </Form>
        <br />
      </Container>
    </>
  );
};

export default FormContac;
