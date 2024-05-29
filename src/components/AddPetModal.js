import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import {
  TextField,
  RadioGroup,
  Radio,
  FormControlLabel,
  Button,
  Typography,
} from "@mui/material";
import Form from "react-bootstrap/Form";

const AddPetModal = ({ show, handleClose }) => {
  // const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    nombre: "",
    tipoMascota: "",
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
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Añadir mascota</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          <Typography variant="h6">Nombre:</Typography>
          <Form.Group controlId="formNombre">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              minLength={2}
              maxLength={20}
              required
            />
          </Form.Group>
          <Typography variant="h6">Tipo de mascota:</Typography>
          <RadioGroup
            aria-label="Tipo de mascota"
            name="tipoMascota"
            value={formData.tipoMascota}
            onChange={handleChange}
            required
          >
            <FormControlLabel value="Perro" control={<Radio />} label="Perro" />
            <FormControlLabel value="Gato" control={<Radio />} label="Gato" />
            <FormControlLabel value="Otro" control={<Radio />} label="Otro" />
          </RadioGroup>
          <Typography variant="h6">Edad:</Typography>
          <TextField
            label="Edad"
            name="edad"
            type="number"
            value={formData.edad}
            onChange={handleChange}
            required
          />
          <Typography variant="h6">Peso:</Typography>
          <TextField
            label="Peso (kg)"
            name="peso"
            type="number"
            value={formData.peso}
            onChange={handleChange}
            InputProps={{
              endAdornment: "kg",
              min: 1,
              max: 100,
            }}
            required
          />
          <Button type="submit" variant="contained" color="primary">
            Enviar
          </Button>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddPetModal;
