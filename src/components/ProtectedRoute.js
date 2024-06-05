import React, { useContext } from "react";

import { Navigate, Outlet } from "react-router-dom";
import { AppContext } from "../contexts/AppContext";

const ProtectedRoute = ({ rolDeseado }) => {
  const { usuarioLogeado } = useContext(AppContext);

  // Verificar si el rol del usuario está en la lista de roles deseados
  const rolValido = Array.isArray(rolDeseado)
    ? rolDeseado.includes(usuarioLogeado.rol)
    : usuarioLogeado.rol === rolDeseado;

  return rolValido ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
