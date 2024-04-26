import { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";

function RegistrationDuenioForm() {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.UsernameValidation.event.stopPropagation();
    }

    setValidated(true);
  };

  return (
    <Form
      noValidate
      validated={validated}
      onSubmit={handleSubmit}
      className="p-5"
    >
      <Row className="mb-3">
        <Form.Group as={Col} md="4" controlId="UsernameValidation">
          <Form.Label>Nombre de Usuario</Form.Label>
          <Form.Control required type="text" />
        </Form.Group>

        <Form.Group as={Col} md="4" controlId="PasswordValidation">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control required type="password" />
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="UsernameValidation">
          <Form.Label>Correo electronico</Form.Label>
          <Form.Control required type="email" />
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md="4" controlId="PrimerNombreValidation">
          <Form.Label>Nombre</Form.Label>
          <Form.Control required type="text" placeholder="Primer nombre" />
        </Form.Group>

        <Form.Group as={Col} md="4" controlId="ApellidoValidation">
          <Form.Label>Apellido</Form.Label>
          <Form.Control required type="text" placeholder="Apellido/s" />
        </Form.Group>

        <Form.Group as={Col} md="4" controlId="DNIValidation">
          <Form.Label>DNI</Form.Label>
          <InputGroup hasValidation>
            <Form.Control type="number" placeholder="DNI" required />
            <Form.Control.Feedback type="invalid">
              Ingrese un numero de DNI valido.
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md="6" controlId="FechaNacimientoValidation">
          <Form.Label>Fecha de nacimiento</Form.Label>
          <Form.Control type="date" required />
          <Form.Control.Feedback type="invalid">
            Cargue una fecha de nacimiento valida
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="3" controlId="NumeroTelefonoValidation">
          <Form.Label>Numero de telefono</Form.Label>
          <Form.Control
            type="number"
            placeholder="Numero de telefono"
            required
          />
          <Form.Control.Feedback type="invalid">
            Cargue un numero de telefono valido
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="3" controlId="CodigoPostalValidation">
          <Form.Label>Codigo postal</Form.Label>
          <Form.Control type="number" placeholder="Codigo Postal" required />
          <Form.Control.Feedback type="invalid">
            Ingrese un codigo postal valido.
          </Form.Control.Feedback>
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
