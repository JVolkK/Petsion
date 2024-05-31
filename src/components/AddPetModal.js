import React, { useState, useContext, forceUpdate, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { Form, InputGroup, Button, Container, Row, Col } from "react-bootstrap";
import { FaDog, FaCat } from "react-icons/fa";
import { GiRabbit } from "react-icons/gi";
import axios from "axios";
import { AppContext } from "../contexts/AppContext";

const AddPetModal = ({ show, handleClose }) => {
  const { usuarioLogeado, setUsuarioLogeado } = useContext(AppContext);

  const [formData, setFormData] = useState({
    user: usuarioLogeado.id,
    nombre: "",
    tipoMascota: "Perro",
    edad: "",
    peso: "",
  });

  const [errors, setErrors] = useState({
    nombre: "",
    edad: "",
    peso: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        await axios.post("https://api-petsion.onrender.com/mascota/register", {
          user: formData.user,
          tipoMascota: formData.tipoMascota,
          nombre: formData.nombre,
          edad: formData.edad,
          peso: formData.edad,
        });

        setFormData({
          user: usuarioLogeado.id,
          nombre: "",
          tipoMascota: "Perro",
          edad: "",
          peso: "",
        });
        setErrors({});
        forceUpdate();
        handleClose();
      } catch (error) {
        // Manejo de errores
      }
      //  finally {
      //   setLoading(false);
      // }
    }
  };

  const validate = () => {
    let newErrors = {};
    const nombreRegex = /^[a-zA-Z0-9]+$/;
    const edadRegex = /^[0-9]+$/;
    const pesoRegex = /^(?:100(\.0{1,2})?|[1-9]?\d(\.\d{1,2})?|0\.[1-9]\d?)$/;

    if (!nombreRegex.test(formData.nombre)) {
      newErrors.nombre = "El nombre solo puede contener letras y números.";
    }
    if (formData.nombre.length < 1 || formData.nombre.length > 20) {
      newErrors.nombre = "El nombre debe ser de entre 1 y 20 caracteres.";
    }
    if (!edadRegex.test(formData.edad)) {
      newErrors.edad = "La edad solo puede contener números del 0 al 9.";
    }
    if (formData.edad < 1 || formData.edad >= 31) {
      newErrors.edad = "La edad debe ser un número entre 1 y 31.";
    }
    if (!pesoRegex.test(formData.peso)) {
      newErrors.peso = "El peso debe ser un número entre 0.001 y 100.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Añadir mascota</Modal.Title>
      </Modal.Header>
      <Modal.Body className="p-3">
        <Form onSubmit={handleSubmit}>
          <Container
            fluid
            className="p-0 d-flex flex-column justify-content-center align-items-center"
          >
            <Row className="w-100 align-items-center d-flex justify-content-center">
              <Col className="p-0 ">
                <Row className="">
                  <Col s={12} xl={6}>
                    <Form.Group className="mb-3" controlId="formGroupNombre">
                      <Form.Label>Nombre</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Ingrese el nombre de su mascota"
                        onChange={handleChange}
                        value={formData.nombre}
                        name="nombre"
                        isInvalid={!!errors.nombre}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.nombre}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col s={12} xl={6}>
                    <Form.Group className="mb-3" controlId="formGroupPeso">
                      <Form.Label>Peso</Form.Label>
                      <InputGroup className="mb-3">
                        <Form.Control
                          type="number"
                          placeholder="Ingrese el peso de su mascota"
                          onChange={handleChange}
                          value={formData.peso}
                          name="peso"
                          isInvalid={!!errors.peso}
                        />
                        <InputGroup.Text>kg</InputGroup.Text>
                        <Form.Control.Feedback type="invalid">
                          {errors.peso}
                        </Form.Control.Feedback>
                      </InputGroup>
                    </Form.Group>
                  </Col>
                  <Col s={12} xl={6}>
                    <Form.Group className="mb-3" controlId="formGroupEdad">
                      <Form.Label>Edad</Form.Label>
                      <InputGroup className="mb-3">
                        <Form.Control
                          type="number"
                          placeholder="Ingrese la edad de su mascota"
                          onChange={handleChange}
                          value={formData.edad}
                          name="edad"
                          isInvalid={!!errors.edad}
                        />
                        <InputGroup.Text>años</InputGroup.Text>
                        <Form.Control.Feedback type="invalid">
                          {errors.edad}
                        </Form.Control.Feedback>
                      </InputGroup>
                    </Form.Group>
                  </Col>
                  <Col s={12} xl={6}>
                    <Form.Group
                      className="mb-3"
                      controlId="formGroupTipoMascota"
                    >
                      <Form.Label>¿Que tipo de mascota es?</Form.Label>
                      <Form.Select
                        onChange={handleChange}
                        value={formData.tipoMascota}
                        name="tipoMascota"
                      >
                        <option value="Perro">Perro</option>
                        <option value="Gato">Gato</option>
                        <option value="Otros">Otro</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row className="w-100">
              <Col
                className="p-0 align-items-center d-flex-column justify-content-center border-top"
                xl={12}
              >
                <div className=" d-flex justify-content-center align-items-end pt-2">
                  {formData.tipoMascota === "Perro" ? (
                    <FaDog size={100} />
                  ) : formData.tipoMascota === "Gato" ? (
                    <FaCat size={100} />
                  ) : formData.tipoMascota === "Otros" ? (
                    <GiRabbit size={100} />
                  ) : null}
                </div>
                <div className="justify-content-center d-flex">
                  {formData.nombre ? <h4>{formData.nombre}</h4> : null}
                </div>
                <div className="justify-content-center d-flex">
                  {formData.edad ? <h5>{formData.edad} años</h5> : null}
                </div>
                <div className="justify-content-center d-flex">
                  {formData.peso ? <h5>{formData.peso} kg</h5> : null}
                </div>
              </Col>
            </Row>
          </Container>
          <Container
            fluid
            className="d-flex justify-content-end border-top pt-2"
          >
            <Button variant="primary" type="submit">
              Guardar mascota
            </Button>
          </Container>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddPetModal;
