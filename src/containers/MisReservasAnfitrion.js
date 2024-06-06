import React, { useState } from "react";
import NavBar from "../components/NavBar";
import ReservasAnfitrionTable from "../components/ReservasAnfitrionTable";
import {
  Box,
  FormControl,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";

const MisReservasAnfitrion = () => {
  const [selectedTable, setSelectedTable] = useState("table1");

  const handleTableChange = (event) => {
    setSelectedTable(event.target.value);
  };

  return (
    <>
      <NavBar />

      <Box sx={{ p: 0 }}>
        <h1>Mis reservas</h1>
        <FormControl fullWidth sx={{ mb: 3 }}>
          <ToggleButtonGroup
            color="primary"
            value={selectedTable}
            exclusive
            onChange={handleTableChange}
            aria-label="Seleccionar tabla"
          >
            <ToggleButton value="table1">Reservas pendientes</ToggleButton>
            <ToggleButton value="table2">Reservas confirmadas</ToggleButton>
          </ToggleButtonGroup>
        </FormControl>
        {selectedTable === "table1" && <ReservasAnfitrionTable />}
        {selectedTable === "table2" && <ReservasAnfitrionTable />}{" "}
      </Box>
    </>
  );
};

export default MisReservasAnfitrion;
