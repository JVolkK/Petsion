import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Collapse,
  Box,
  Typography,
  Chip,
  Button,
  Grid,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { AppContext } from "../contexts/AppContext"; // Asume que tienes un contexto definido

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  width: "auto",
  padding: theme.spacing(0),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function Row(props) {
  const { row } = props;
  const [open, setOpen] = useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.user.name} {row.user.lastname}
        </TableCell>
        <TableCell align="left">{row.tipoDeServicio}</TableCell>
        <TableCell align="left" className=" d-flex justify-content-start">
          {row.reservaActiva ? (
            <Chip label="Pendiente" />
          ) : (
            <Chip label="Pendiente" color="warning" />
          )}
        </TableCell>
        <TableCell align="left">
          <Button
            variant="contained"
            color="success"
            size="small"
            sx={{ mx: 1 }}
          >
            Aceptar
          </Button>
          <Button variant="contained" color="error" size="small">
            Rechazar
          </Button>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Detalles
              </Typography>
              <Typography variant="body2" gutterBottom>
                Mensaje: {row.mensaje}
              </Typography>
              <Typography variant="body1" gutterBottom>
                Fecha de entrada y salida:{" "}
                <Typography variant="subtitle2" gutterBottom>
                  {new Date(row.fechaDeEntrada).toLocaleDateString()} -{" "}
                  {new Date(row.fechaDeSalida).toLocaleDateString()}
                </Typography>
              </Typography>
              <Typography variant="body2" gutterBottom>
                Horario de entrada y salida:{" "}
                {new Date(row.horarioDeEntrada).toLocaleTimeString()} -{" "}
                {new Date(row.horarioDeSalida).toLocaleTimeString()}
              </Typography>
              <Typography variant="body2" gutterBottom>
                Mascotas a Cuidar:
              </Typography>
              <Table size="small" aria-label="mascotas">
                <TableHead>
                  <TableRow>
                    <TableCell>Tipo</TableCell>
                    <TableCell>Nombre</TableCell>
                    <TableCell>Edad</TableCell>
                    <TableCell>Peso</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.mascotasCuidado.map((mascota) => (
                    <TableRow key={mascota._id}>
                      <TableCell>{mascota.tipoMascota}</TableCell>
                      <TableCell>{mascota.nombre}</TableCell>
                      <TableCell>{mascota.edad}</TableCell>
                      <TableCell>{mascota.peso}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    user: PropTypes.shape({
      name: PropTypes.string.isRequired,
      lastname: PropTypes.string.isRequired,
    }).isRequired,
    tipoDeServicio: PropTypes.string.isRequired,
    reservaActiva: PropTypes.bool.isRequired,
    fechaDeEntrada: PropTypes.string.isRequired,
    fechaDeSalida: PropTypes.string.isRequired,
    horarioDeEntrada: PropTypes.string.isRequired,
    horarioDeSalida: PropTypes.string.isRequired,
    mensaje: PropTypes.string.isRequired,
    mascotasCuidado: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string.isRequired,
        tipoMascota: PropTypes.string.isRequired,
        nombre: PropTypes.string.isRequired,
        edad: PropTypes.number.isRequired,
        peso: PropTypes.number.isRequired,
      })
    ).isRequired,
  }).isRequired,
};

export default function ReservasAnfitrionTable() {
  const { setUsuarioLogeado } = useContext(AppContext);
  const [datosReserva, setDatosReserva] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedUsuarioLogeado = JSON.parse(
      localStorage.getItem("usuarioLogeado")
    );
    if (storedUsuarioLogeado) {
      setUsuarioLogeado(storedUsuarioLogeado);
    } else {
      return;
    }

    if (storedUsuarioLogeado.id) {
      setLoading(true);
      axios
        .post(`https://api-petsion.onrender.com/reservas/anfitrion`, {
          anfitrion: storedUsuarioLogeado.id,
        })
        .then((response) => {
          setDatosReserva(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    }
  }, [setUsuarioLogeado]);

  if (loading) {
    return <p>Cargando...</p>;
  }

  return (
    <>
      <h1>Mis reservas</h1>
      <Grid>
        <Item sx={{ m: 3 }}>
          <TableContainer component={Paper} container>
            <Table aria-label="collapsible table">
              <TableHead>
                <TableRow>
                  <TableCell />
                  <TableCell align="left" sx={{ fontWeight: "bold" }}>
                    Usuario
                  </TableCell>

                  <TableCell align="left" sx={{ fontWeight: "bold" }}>
                    Tipo de servicio
                  </TableCell>
                  <TableCell align="left" sx={{ fontWeight: "bold" }}>
                    Estado de la reserva
                  </TableCell>
                  <TableCell align="left" sx={{ fontWeight: "bold" }}>
                    Actualizar estado
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {datosReserva.map((row) => (
                  <Row key={row._id} row={row} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Item>
      </Grid>
    </>
  );
}
