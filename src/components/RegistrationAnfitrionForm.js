import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useForm } from "../hooks/useForm";
import "../styles/DuenioFormStyle.css";

const initialForm = {
  //Valores base para el state de Form en el hook perzonalizado useForm
  username: "",
  password: "",
  email: "",
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

  return errors; // Esta variable error viene y se usa en el useForm
};

let styles = {
  // Estilo para los mensajes de error
  fontWeight: "bold",
  color: "#dc3545",
};

function RegistrationAnfitrionForm() {
  const {
    form,
    errors,
    // loading,
    // response,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useForm(initialForm, validationsForm); // Llamamos a useForm y extraemos de el todos los estados y funciones que utilizaremos

  return (
    <Form onSubmit={handleSubmit} className="p-5">
      <h1 className="pb-3">Registrarse como dueño</h1>
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
            className="inputStyle"
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
            className="inputStyle"
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

      <Button type="submit">Enviar</Button>
    </Form>
  );
}

export default RegistrationAnfitrionForm;
