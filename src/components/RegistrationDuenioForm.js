import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import { useForm } from "../hooks/useFormDuenio";
import "../styles/DuenioFormStyle.css";
import "../styles/globalStyles.css";
import LoadingOverlay from "../components/LoadingOverlay";

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
  } else if (!usernamePattern.test(form.username)) {
    errors.username =
      "El campo de nombre de usuario no acepta caracteres especiales.";
  }

  //Validaciones password
  if (!form.password.trim()) {
    errors.password = "El campo contraseña es requerido";
  } else if (!passwordPattern.test(form.password)) {
    errors.password =
      " La contraseña debe contener letras y numeros y al menos 8 caracteres.";
  }

  //Validaciones
  if (!form.email.trim()) {
    errors.email = "El campo de correo electronico es requerido ";
  } else if (!emailPattern.test(form.email)) {
    errors.email = "El correo electronico ingresado es invalido";
  }

  //Validaciones nombre
  if (!form.nombre.trim()) {
    errors.nombre = "El campo de nombre es requerido ";
  } else if (!namePattern.test(form.nombre)) {
    errors.nombre = "El campo de nombre no acepta caracteres especiales.";
  }

  //Validaciones apellido
  if (!form.apellido.trim()) {
    errors.apellido = "El campo de apellido es requerido";
  } else if (!namePattern.test(form.apellido)) {
    errors.apellido = "El campo de apellido no acepta caracteres especiales.";
  }

  //Validaciones dni
  if (!form.dni) {
    errors.dni = "El campo de dni es requerido";
  } else if (form.dni > 70000000 || form.dni < 1000000) {
    errors.dni = "Ingrese un DNI valido.";
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
  } else if (!numberPattern.test(form.codigoPostal)) {
    errors.codigoPostal = "Este campo solo acepta numeros.";
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

var usernamePattern = /^[a-zA-Z0-9]+$/;
var namePattern = /^[a-zA-ZñÑ]+(?: [a-zA-ZñÑ]+)?$/;
var passwordPattern = /^(?=.*[a-zA-Z])[a-zA-Z\d!@#$%^&*()\-_=+{};:,<.>.]{8,}$/;
var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
var numberPattern = /^[0-9]+$/;

function RegistrationDuenioForm() {
  const {
    form,
    errors,
    submitPressed,
    loading,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useForm(initialForm, validationsForm); // Llamamos a useForm y extraemos de el todos los estados y funciones que utilizaremos

  return (
    <div>
      <LoadingOverlay loading={loading} />
      <Form onSubmit={handleSubmit} className="p-5">
        <h1 className="pb-3">Registrarse como dueño</h1>
        <Row className="mb-3">
          <Form.Group as={Col} md="4">
            <Form.Label>Nombre de Usuario</Form.Label>
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
              className="inputStyle"
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
              <label>
                {" "}
                La contraseña debe contener letras y numeros y al menos 8
                caracteres.
              </label>
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
            <Form.Label>Codigo postal</Form.Label>
            <Form.Control
              min="100"
              max="10000"
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
        <Form.Group className="mb-3">
          <Form.Check
            required
            label="Aceptar terminos y condiciones"
            feedback="Debes aceptar los terminos y condiciones antes de continuar."
            feedbackType="invalid"
          />
        </Form.Group>
        <Button type="submit" className="buttonPetsion">
          Enviar
        </Button>
      </Form>
    </div>
  );
}

export default RegistrationDuenioForm;
