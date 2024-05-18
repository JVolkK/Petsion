import React, { useState } from 'react';
import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import RegistrationSelect from "./RegistrationSelect";
import "../styles/App.css";
import RegistrationDuenio from "./RegistrationDuenio";
import Servicios from "./Servicios";
import BuscarCuidador from "./BuscarCuidador";
import RegistrationAnfitrion from "./RegistrationAnfitrion";
import Contacto from "./Contacto";
import LoginPage from "./Login";
import { AppProvider } from "../contexts/AppContext";
import NavBar from "../components/NavBar";

function App() {
  const [isAuthenticated, setAuthenticated] = useState(false);

  return (
    <AppProvider>
      <div className="App">
        <NavBar isAuthenticated={isAuthenticated} setAuthenticated={setAuthenticated} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/registration-select" element={<RegistrationSelect />} />
          <Route path="/registration-duenio" element={<RegistrationDuenio />} />
          <Route path="/servicios-select" element={<Servicios />} />
          <Route path="/buscar-cuidador" element={<BuscarCuidador />} />
          <Route path="/login" element={<LoginPage setAuthenticated={setAuthenticated} />} />
          <Route path="/registration-anfitrion" element={<RegistrationAnfitrion />} />
          <Route path="/contacto" element={<Contacto />} />
        </Routes>
      </div>
    </AppProvider>
  );
}

export default App;
