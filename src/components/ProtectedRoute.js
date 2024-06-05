// ProtectedRoutes.js
import React, { useContext } from 'react';
import {  Navigate, Outlet } from 'react-router-dom';
import { AppContext } from "../contexts/AppContext";

const ProtectedRoute = ({rolDeseado}) => {
  const { usuarioLogeado } = useContext(AppContext);

  return usuarioLogeado.rol === rolDeseado ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
