import React, { useContext, useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { AppContext } from "../contexts/AppContext";
import axios from "axios";
import LoadingOverlay from "../components/LoadingOverlay";

const MisReservasAnfitrion = () => {
  const { setUsuarioLogeado } = useContext(AppContext);
  const [datosAnfitrion, setDatosAnfitrion] = useState({});
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
  }, [setUsuarioLogeado]);

  return (
    <>
      <LoadingOverlay loading={loading} />
      <NavBar />
      {/* <Grid container spacing={2}>
  <Grid item xs={8}>
    <Item>xs=8</Item>
  </Grid>
  
</Grid> */}
      <h1>MisReservasAnfitrion</h1>
    </>
  );
};

export default MisReservasAnfitrion;
