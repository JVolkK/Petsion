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
  IconButton,
  Collapse,
  Typography,
  Chip,
  Grid,
  Stack,
  Paper,
  Box,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { AppContext } from "../contexts/AppContext"; // Asume que tienes un contexto definido
import LoadingOverlay from "./LoadingOverlay";
import image from "../images/SinReservasPendientes.jpg";

const Item = styled(Paper)(({ theme }) => ({
  width: "auto",
  padding: theme.spacing(0),
  textAlign: "center",
  boxShadow: "none",
}));

function Row(props) {
  const { row } = props;
  const [open, setOpen] = useState(false);

  const getShortAddress = (direccion) => {
    const parts = direccion.split(",");
    return parts.slice(0, 4).join(",");
  };

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell sx={{ p: 0, pl: 1 }}>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" align="left">
          <Typography
            variant="subtitle2"
            gutterBottom
            sx={{
              display: "flex",
              alignItems: "center",
              ml: 1,
              fontWeight: "bold",
            }}
          >
            {row.anfitrion.name} {row.anfitrion.lastname}
          </Typography>
        </TableCell>

        <TableCell align="left">
          {getShortAddress(row.anfitrion.direccion)}
        </TableCell>
        <TableCell align="left" sx={{ height: "100%" }}>
          {row.reservaActiva ? (
            <Chip label="Pendiente de aceptacion" color="warning" />
          ) : (
            <Chip label="Pendiente de aceptacion" color="warning" />
          )}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ fontWeight: "bold", pt: 3 }}
            >
              Detalles
            </Typography>
            <Grid sx={{ margin: 1, display: "column" }}>
              <Stack direction="column" alignItems="start">
                <Item
                  sx={{
                    display: {
                      xs: "column",
                      xl: "flex",
                      md: "flex",
                      sm: "flex",
                    },
                    alignItems: "center",
                  }}
                >
                  <Typography
                    variant="body1"
                    gutterBottom
                    sx={{ fontWeight: "bold", pl: 0 }}
                  >
                    Id de la reserva
                  </Typography>
                  <Typography variant="subtitle2" gutterBottom>
                    {row._id}
                  </Typography>
                </Item>

                <Item
                  sx={{
                    display: {
                      xs: "column",
                      xl: "flex",
                      md: "flex",
                      sm: "flex",
                    },
                    alignItems: "center",
                  }}
                >
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{ fontWeight: "bold", alignItems: "center" }}
                  >
                    Anfitrion:
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    gutterBottom
                    sx={{ alignItems: "center", pl: 1 }}
                  >
                    {row.anfitrion.name} {row.anfitrion.lastname}
                  </Typography>
                </Item>
                <Item
                  sx={{
                    display: {
                      xs: "column",
                      xl: "flex",
                      md: "flex",
                      sm: "flex",
                    },
                    alignItems: "center",
                  }}
                >
                  <Typography
                    variant="body1"
                    gutterBottom
                    sx={{ fontWeight: "bold", pl: 0 }}
                  >
                    Precio:
                  </Typography>
                  <Typography variant="subtitle2" gutterBottom>
                    {"$"}
                    {row.anfitrion.tarifaBase}
                    {" ARS"}
                  </Typography>
                </Item>

                {/* <Item
                  sx={{
                    display: {
                      xs: "column",
                      xl: "flex",
                      md: "flex",
                      sm: "flex",
                    },
                    alignItems: "center",
                  }}
                >
                  <Typography
                    variant="body1"
                    gutterBottom
                    sx={{ fontWeight: "bold", pl: 0 }}
                  >
                    Horario de entrada y salida:{" "}
                  </Typography>
                  <Typography variant="subtitle2" gutterBottom>
                    {formatTime(new Date(row.horarioDeEntrada))} -{" "}
                    {formatTime(new Date(row.horarioDeSalida))}
                  </Typography>
                </Item> */}
              </Stack>

              <Stack>
                <Typography
                  variant="body1"
                  gutterBottom
                  sx={{ fontWeight: "bold", pl: 0, pb: 0 }}
                >
                  Mascotas
                </Typography>
                <Paper
                  sx={{
                    width: "50%",
                  }}
                >
                  <Table aria-label="mascotas">
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ fontWeight: "bold" }}>Tipo</TableCell>
                        <TableCell sx={{ fontWeight: "bold" }}>
                          Nombre
                        </TableCell>
                        <TableCell sx={{ fontWeight: "bold" }}>Edad</TableCell>
                        <TableCell sx={{ fontWeight: "bold" }}>Peso</TableCell>
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
                </Paper>
              </Stack>
            </Grid>
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

export default function ReservasDuenioTable() {
  const { setUsuarioLogeado } = useContext(AppContext);
  const [datosReserva, setDatosReserva] = useState();
  const [loading, setLoading] = useState(false);
  const [renderKey, setRenderKey] = useState(0);

  const handleRerender = () => setRenderKey((prevKey) => prevKey + 1);

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
        .post(`https://api-petsion.onrender.com/reservas/user`, {
          user: storedUsuarioLogeado.id,
        })
        .then((response) => {
          console.log(setUsuarioLogeado.id);
          console.log(storedUsuarioLogeado.id);
          setDatosReserva(response.data);
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
        });
    }
  }, [setUsuarioLogeado, renderKey]);

  if (loading) {
    return <LoadingOverlay loading={loading} />;
  }

  return (
    <>
      <Grid>
        {datosReserva ? (
          <Item sx={{ m: 3 }}>
            <TableContainer component={Paper}>
              <Table aria-label="collapsible table">
                <TableHead>
                  <TableRow>
                    <TableCell />
                    <TableCell align="left" sx={{ fontWeight: "bold" }}>
                      Nombre del anfitrion
                    </TableCell>

                    <TableCell align="left" sx={{ fontWeight: "bold" }}>
                      Dirección
                    </TableCell>
                    <TableCell align="left" sx={{ fontWeight: "bold" }}>
                      Estado de la reserva
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {datosReserva.map((row) => (
                    <Row
                      key={row._id}
                      row={row}
                      handleRerender={handleRerender}
                      setDatosReserva={setDatosReserva}
                    />
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Item>
        ) : (
          <Box
            sx={{
              width: "100%",
              maxWidth: "30rem",
              margin: "auto",
            }}
          >
            <img
              src={image}
              alt="Responsive"
              style={{
                borderRadius: "7rem",
                width: "100%",
                height: "auto",
                display: "block",
              }}
            />
            <Item sx={{ pl: 0, m: "auto" }}>
              <Typography
                variant="subtitle2"
                gutterBottom
                sx={{ fontWeight: "bold", fontSize: "1.5rem", p: 2, pb: 1 }}
              >
                No tienes ninguna reserva pendiente
              </Typography>
              <Typography
                variant="subtitle2"
                gutterBottom
                sx={{ pl: 0, m: "auto" }}
              >
                Puedes reservar un anfitrion en Buscar Cuidador 😊
              </Typography>
            </Item>
          </Box>
        )}
      </Grid>
    </>
  );
}
