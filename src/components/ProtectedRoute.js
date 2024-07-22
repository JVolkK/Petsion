import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AppContext } from "../contexts/AppContext";

const ProtectedRoute = ({ rolDeseado }) => {
  const { usuarioLogeado } = useContext(AppContext);

  if (usuarioLogeado === null) {
    return null;
  }

  const rolValido = Array.isArray(rolDeseado)
    ? rolDeseado.includes(usuarioLogeado.rol)
    : usuarioLogeado.rol === rolDeseado;

  return rolValido ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;
