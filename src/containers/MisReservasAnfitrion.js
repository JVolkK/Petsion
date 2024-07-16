import React, { useState } from "react";
import NavBar from "../components/NavBar";
import ReservasAnfitrionTable from "../components/ReservasAnfitrionTable";
import {
  Box,
  FormControl,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ReservasConfirmadasAnfitrionTable from "../components/ReservasConfirmadasAnfitrionTable";
import ReservasFinalizadasAnfitrionTable from "../components/ReservasFinalizadasAnfitrionTable";

const MisReservasAnfitrion = () => {
  const [selectedTable, setSelectedTable] = useState("table1");

  const handleTableChange = (event) => {
    setSelectedTable(event.target.value);
  };

  const theme = createTheme({
    components: {
      MuiToggleButton: {
        styleOverrides: {
          root: {
            fontWeight: "bold",
            "&.Mui-selected": {
              color: "#4E75B5",
              backgroundColor: "rgb(85 91 97 / 8%)",
            },
          },
        },
      },
    },
  });

  return (
    <>
      <NavBar />

      <Box sx={{ width: "100%" }}>
        <Box sx={{ ml: 5, my: 2, display: "flex" }}>
          <h1>Mis reservas</h1>
        </Box>
        <Box>
          <ThemeProvider theme={theme}>
            <FormControl fullWidth>
              <ToggleButtonGroup
                sx={{
                  px: 3,
                  ".MuiToggleButtonGroup-grouped": {},
                  ".MuiToggleButton-root": {
                    fontWeight: "bold",
                  },
                  ".Mui-selected": {
                    color: "#4E75B5",
                    backgroundColor: "rgb(85 91 97 / 8%)",
                  },
                }}
                color="primary"
                value={selectedTable}
                exclusive
                onChange={handleTableChange}
                aria-label="Seleccionar tabla"
              >
                <ToggleButton
                  value="table1"
                  sx={{
                    width: "100%",
                    display: "flex",
                    borderTopLeftRadius: "1rem",
                    borderBottomLeftRadius: "1rem",
                  }}
                >
                  Reservas pendientes
                </ToggleButton>
                <ToggleButton
                  value="table2"
                  sx={{
                    width: "100%",
                    display: "flex",
                    borderTopRightRadius: "1rem",
                    borderBottomRightRadius: "1rem",
                  }}
                >
                  Reservas confirmadas
                </ToggleButton>
                <ToggleButton
                  value="table3"
                  sx={{
                    width: "100%",
                    display: "flex",
                    borderTopRightRadius: "1rem",
                    borderBottomRightRadius: "1rem",
                  }}
                >
                  Reservas finalizadas
                </ToggleButton>
              </ToggleButtonGroup>
            </FormControl>{" "}
          </ThemeProvider>
        </Box>
        {selectedTable === "table1" && <ReservasAnfitrionTable />}
        {selectedTable === "table2" && <ReservasConfirmadasAnfitrionTable />}
        {selectedTable === "table3" && (
          <ReservasFinalizadasAnfitrionTable />
        )}{" "}
      </Box>
    </>
  );
};

export default MisReservasAnfitrion;
