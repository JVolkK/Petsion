import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useForm } from "../hooks/useFormAnfitrion";
import "../styles/DuenioFormStyle.css";
import "../styles/globalStyles.css";
import Step1 from "../components/Step1RegistrationAnfitrion";
import Step2 from "../components/Step2RegistrationAnfitrion";
import Step3 from "../components/Step3RegistrationAnfitrion";
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
  direccion: "",
  numeroDireccion: 0,
  tipoDeVivienda: "Casa",
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
    errors.nombre =
      "El campo de nombre no acepta caracteres especiales. Maximo 2 nombres.";
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
  }
  // else if (!addressPattern.test(form.direccion)) {
  //   errors.direccion =
  //     "Debe contener al menos tres letras, un numero y un espacio.";
  // }

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

var usernamePattern = /^[a-zA-Z0-9]+$/;
var namePattern = /^[a-zA-ZñÑ]+(?: [a-zA-ZñÑ]+)?$/;
var passwordPattern = /^(?=.*[a-zA-Z])[a-zA-Z\d!@#$%^&*()\-_=+{};:,<.>.]{8,}$/;
var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
var numberPattern = /^[0-9]+$/;

function RegistrationAnfitrionForm() {
  const [step, setStep] = useState(1);

  const handleNext = () => {
    setStep(step + 1);
  };

  const handlePrev = () => {
    setStep(step - 1);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Step1
            form={form}
            handleChange={handleChange}
            handleBlur={handleBlur}
            errors={errors}
            submitPressed={submitPressed}
            styles={{ fontWeight: "bold", color: "#dc3545" }}
          />
        );
      case 2:
        return (
          <Step2
            form={form}
            handleChange={handleChange}
            handleBlur={handleBlur}
            errors={errors}
            submitPressed={submitPressed}
            handleAddressSelect={handleAddressSelect}
            selectedAddress={selectedAddress}
            styles={{ fontWeight: "bold", color: "#dc3545" }}
          />
        );
      case 3:
        return (
          <Step3
            form={form}
            handleChange={handleChange}
            handleBlur={handleBlur}
            errors={errors}
            submitPressed={submitPressed}
            styles={{ fontWeight: "bold", color: "#dc3545" }}
          />
        );
      default:
        return null;
    }
  };

  const {
    form,
    errors,
    submitPressed,
    loading,
    handleChange,
    handleBlur,
    handleSubmit,
    handleAddressSelect,
    selectedAddress,
  } = useForm(initialForm, validationsForm); // Llamamos a useForm y extraemos de el todos los estados y funciones que utilizaremos

  return (
    <div>
      <LoadingOverlay loading={loading} />
      <Form onSubmit={handleSubmit} className="p-5 mt-5">
        <h1 className="pb-3">Registrarse como anfitrion</h1>
        {renderStep()}
        <div className="button-group d-flex justify-content-end">
          {step > 1 && (
            <Button variant="secondary" onClick={handlePrev} disabled={loading}>
              Anterior
            </Button>
          )}
          {step < 3 && (
            <Button
              variant="primary"
              onClick={handleNext}
              className="ms-3 buttonPetsion"
              disabled={loading}
            >
              Siguiente
            </Button>
          )}
          {step === 3 && (
            <Button
              variant="success"
              type="submit"
              className="ms-3 buttonPetsion"
              disabled={loading}
            >
              {loading ? "Enviando..." : "Enviar"}
            </Button>
          )}
        </div>
        <div className="d-flex justify-content-end">
          {submitPressed === true && Object.keys(errors).length >= 1 && (
            <p style={{ fontWeight: "bold", color: "#dc3545" }}>
              Tienes errores por corregir
            </p>
          )}
        </div>
      </Form>
    </div>
  );
}

export default RegistrationAnfitrionForm;
