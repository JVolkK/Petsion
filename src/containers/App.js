import React, { useContext } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./Home";
import RegistrationSelect from "./RegistrationSelect";
import RegistrationDuenio from "./RegistrationDuenio";
import Servicios from "./Servicios";
import BuscarCuidador from "./BuscarCuidador";
import RegistrationAnfitrion from "./RegistrationAnfitrion";
import Contacto from "./Contacto";
import LoginPage from "./Login";
import { AppContext } from "../contexts/AppContext";
import PerfilAnfitrion from "./PerfilAnfitrion";
import ValidateEmail from "./ValidateEmail";
import "../styles/leaflet.css";
import EmailValidated from "./EmailValidated";
import PerfilDuenio from "./PerfilDuenio";

function App() {
  const { isAuthenticated } = useContext(AppContext);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/registration-select" element={<RegistrationSelect />} />
        <Route path="/registration-duenio" element={<RegistrationDuenio />} />
        <Route path="/servicios-select" element={<Servicios />} />
        <Route path="/buscar-cuidador" element={<BuscarCuidador />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/registration-anfitrion"
          element={<RegistrationAnfitrion />}
        />
        <Route path="/validate-email" element={<ValidateEmail />} />
        <Route path="/email-validated" element={<EmailValidated />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/perfil-duenio" element={<PerfilDuenio />} />
        {isAuthenticated ? (
          <Route path="/mi-perfil" element={<PerfilAnfitrion />} />
        ) : (
          <Route path="/mi-perfil" element={<Navigate to="/login" />} /> // Utiliza Navigate dentro de un Route
        )}
      </Routes>
    </div>
  );
}

export default App;
