import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import InputGroup from "react-bootstrap/InputGroup";
import { useForm } from "../hooks/useFormAnfitrion";
import "../styles/DuenioFormStyle.css";

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
  direccion: "",
  numeroDireccion: 0,
  tipoDeVivienda: "",
  conPatio: false,
  admitePerro: false,
  admiteGato: false,
  admiteAlltypesMascotas: false,
  disponibilidadHoraria: "Mañana",
  cantidadDeAnimales: "",
  disponibilidadAlojamiento: false,
  disponibilidadPaseo: false,
  disponibilidadVisita: false,
  disponibilidadlunes: false,
  disponibilidadmartes: false,
  disponibilidadmiercoles: false,
  disponibilidadjueves: false,
  disponibilidadviernes: false,
  disponibilidadsabado: false,
  disponibilidaddomingo: false,
  tarifaBase: "",
  distintoDueño: false,
  cancelaciones: true,
};

const validationsForm = (form) => {
  // Aqui van todas las validaciones de cada input del formulario
  let errors = {};

  //Validaciones username
  if (!form.username.trim()) {
    errors.username = "El campo nombre de usuario es requerido.";
  } else if (!namePattern.test(form.username)) {
    errors.username =
      "El campo de nombre de usuario no acepta caracteres especiales.";
  }

  //Validaciones password
  if (!form.password.trim()) {
    errors.password = "El campo contraseña es requerido";
  } else if (!passwordPattern.test(form.password)) {
    errors.password =
      " La contraseña debe contener al menos una mayuscula, minimo 10 caracteres y no contener espacios";
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
    errors.dni = "El campo de DNI es requerido";
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

  //Validaciones direccion
  if (!form.direccion.trim()) {
    errors.direccion = "El campo de direccion es requerido";
  } else if (!addressPattern.test(form.direccion)) {
    errors.direccion =
      "Debe contener al menos tres letras, un numero y un espacio.";
  }

  //Validaciones tipo de mascotas que cuida
  if (
    form.admiteGato === false &&
    form.admitePerro === false &&
    form.admiteAlltypesMascotas === false
  ) {
    errors.admiteGato = "Debe aceptar algun tipo de mascota a cuidar.";
    errors.admitePerro = "Debe aceptar algun tipo de mascota a cuidar.";
    errors.admiteAlltypesMascotas =
      "Debe aceptar algun tipo de mascota a cuidar.";
  } else if (form.admiteAlltypesMascotas === true) {
    form.admiteGato = true;
    form.admitePerro = true;
  }

  //Validaciones cantidad de animales que cuida
  if (!form.cantidadDeAnimales) {
    errors.cantidadDeAnimales = "Este campo es requerido.";
  } else if (!numberPattern.test(form.cantidadDeAnimales)) {
    errors.cantidadDeAnimales = "Solo puede ingresar numeros.";
  } else if (form.cantidadDeAnimales > 10 || form.cantidadDeAnimales < 1) {
    errors.cantidadDeAnimales = "Ingrese un numero igual o menor a 10.";
  }

  //Validaciones que servicios ofrece
  if (
    form.disponibilidadAlojamiento === false &&
    form.disponibilidadPaseo === false &&
    form.disponibilidadVisita === false
  ) {
    errors.disponibilidadAlojamiento = "Debe elegir al menos 1 servicio.";
    errors.disponibilidadPaseo = "Debe elegir al menos 1 servicio.";
    errors.disponibilidadVisita = "Debe elegir al menos 1 servicio.";
  }

  //Validaciones que dias de la semana trabajaria
  if (
    form.disponibilidadlunes === false &&
    form.disponibilidadmartes === false &&
    form.disponibilidadmiercoles === false &&
    form.disponibilidadjueves === false &&
    form.disponibilidadviernes === false &&
    form.disponibilidadsabado === false &&
    form.disponibilidaddomingo === false
  ) {
    errors.disponibilidadlunes = "Debe elegir al menos un dia de la semana.";
    errors.disponibilidadmartes = "Debe elegir al menos un dia de la semana.";
    errors.disponibilidadmiercoles =
      "Debe elegir al menos un dia de la semana.";
    errors.disponibilidadjueves = "Debe elegir al menos un dia de la semana.";
    errors.disponibilidadviernes = "Debe elegir al menos un dia de la semana.";
    errors.disponibilidadsabado = "Debe elegir al menos un dia de la semana.";
    errors.disponibilidaddomingo = "Debe elegir al menos un dia de la semana.";

    //Validaciones tarifaBase
    if (!form.tarifaBase) {
      errors.tarifaBase = "Este campo es requerido";
    } else if (!numberPattern.test(form.tarifaBase)) {
      errors.tarifaBase = "Solo puede ingresar numeros.";
    } else if (form.tarifaBase > 1000000 || form.tarifaBase < 1) {
      errors.tarifaBase = "Ingrese un tarifaBase valido.";
    }
  }

  return errors; // Esta variable error viene y se usa en el useForm
};

let styles = {
  // Estilo para los mensajes de error
  fontWeight: "bold",
  color: "#dc3545",
};

var namePattern = /^[a-zA-Z]+$/;
var passwordPattern = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d@.#$!%*?&]{10,15}$/; // Test para password, requiere al menos una letra minuscula, una mayuscula, un caracter especial, un numero y un largo minimo de 8 a 15 caracteres
var emailPattern = /^[a-zA-Z0–9._-]+@[a-zA-Z0–9.-]+\.[a-zA-Z]{2,4}$/;
var numberPattern = /^[0-9]+$/;
var addressPattern =
  /^(?=(?:[^A-Za-z]*[A-Za-z]){3})(?=.*\d)(?=.*\s)[A-Za-z\d\s-]+$/;

function RegistrationAnfitrionForm() {
  const {
    form,
    errors,
    submitPressed,
    // loading,
    //response,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useForm(initialForm, validationsForm); // Llamamos a useForm y extraemos de el todos los estados y funciones que utilizaremos

  return (
    <Form onSubmit={handleSubmit} className="p-5">
      <h1 className="pb-3">Registrarse como anfitrion</h1>
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
              La contraseña debe contener al menos una mayuscula, minimo 10
              caracteres y no contener espacios
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
            placeholder="Primer nombre"
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
          <Form.Control
            className="inputStyle"
            type="text"
            placeholder="Direccion"
            required
            name="direccion"
            minLength={2}
            maxLength={50}
            onBlur={handleBlur}
            onChange={handleChange}
            value={form.direccion}
          />
          {submitPressed === true && errors.direccion && (
            <p style={styles}>{errors.direccion}</p>
          )}
        </Form.Group>
      </Row>
      <Row className="mb-4">
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
      <Row className="mb-5">
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
              <p style={styles}>{errors.admiteAlltypesMascotas}</p>
            )}
        </Form.Group>
        <Form.Group as={Col} md="4">
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
        <Form.Group as={Col} md="4">
          <Form.Label>¿Que cantidad de animales cuidarias?</Form.Label>
          <InputGroup>
            <Form.Control
              className="inputStyle"
              min="1"
              max="10"
              type="number"
              placeholder="Cantidad animales que cuidarias"
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
      </Row>
      <Row className="mb-5">
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
      <Row className="mt-3">
        <Form.Group className="mb-3">
          <Form.Check
            required
            label="Aceptar terminos y condiciones"
            feedback="Debes aceptar los terminos y condiciones antes de continuar."
            feedbackType="invalid"
          />
        </Form.Group>
      </Row>
      <Button type="submit">Enviar</Button>
    </Form>
  );
}

export default RegistrationAnfitrionForm;
