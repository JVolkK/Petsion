import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Form, InputGroup, Button, Container, Row, Col } from "react-bootstrap";
import { FaDog, FaCat } from "react-icons/fa";
import { GiRabbit } from "react-icons/gi";

const AddPetModal = ({ show, handleClose }) => {
  // const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    nombre: "",
    tipoMascota: "Perro",
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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí podrías agregar la lógica para enviar los datos o hacer algo con ellos

    console.log(formData);
  };

  // var namePattern = /^[a-zA-Z]+$/;
  // var numberPattern = /^[0-9]+$/;
  //Validaciones username
  // if (!formData.nombre.trim()) {
  //   errors.nombre = "El campo nombre de usuario es requerido.";
  // } else if (!namePattern.test(formData.nombre)) {
  //   errors.nombre =
  //     "El campo de nombre de usuario no acepta caracteres especiales.";
  // }

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
                    <Form.Group className="mb-3" controlId="formGroupPassword">
                      <Form.Label>Nombre</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Ingrese el nombre de su mascota"
                        onChange={handleChange}
                        value={formData.nombre}
                        name="nombre"
                      />
                    </Form.Group>
                  </Col>
                  <Col s={12} xl={6}>
                    <Form.Group className="mb-3" controlId="formGroupEmail">
                      <Form.Label>Peso</Form.Label>
                      <InputGroup className="mb-3">
                        <Form.Control
                          type="number"
                          placeholder="Ingrese el peso de su mascota"
                          onChange={handleChange}
                          value={formData.peso}
                          name="peso"
                        />
                        <InputGroup.Text>kg</InputGroup.Text>
                      </InputGroup>
                    </Form.Group>
                  </Col>
                  <Col s={12} xl={6}>
                    <Form.Group className="mb-3" controlId="formGroupEmail">
                      <Form.Label>Edad</Form.Label>
                      <InputGroup className="mb-3">
                        <Form.Control
                          type="number"
                          placeholder="Ingrese la edad de su mascota"
                          onChange={handleChange}
                          value={formData.edad}
                          name="edad"
                        />
                        <InputGroup.Text>años</InputGroup.Text>
                      </InputGroup>
                    </Form.Group>
                  </Col>
                  <Col s={12} xl={6}>
                    <Form.Group>
                      <Form.Label>¿Que tipo de mascota es?</Form.Label>
                      <Form.Select
                        onChange={handleChange}
                        value={formData.tipoMascota}
                        name="tipoMascota"
                      >
                        <option value="perro">Perro</option>
                        <option value="gato">Gato</option>
                        <option value="otro">Otro</option>
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
                  {formData.tipoMascota === "perro" ? (
                    <FaDog size={100} />
                  ) : formData.tipoMascota === "gato" ? (
                    <FaCat size={100} />
                  ) : formData.tipoMascota === "otro" ? (
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
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" type="submit">
          Guardar mascota
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddPetModal;
