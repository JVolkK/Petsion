import React, { useContext } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Home from './Home';
import RegistrationSelect from './RegistrationSelect';
import RegistrationDuenio from './RegistrationDuenio';
import Servicios from './Servicios';
import BuscarCuidador from './BuscarCuidador';
import RegistrationAnfitrion from './RegistrationAnfitrion';
import Contacto from './Contacto';
import LoginPage from './Login';
import { AppContext } from '../contexts/AppContext';
import OwnerProfile from './OwnerProfile';
import '../styles/leaflet.css';

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
        <Route path="/registration-anfitrion" element={<RegistrationAnfitrion />} />
        <Route path="/contacto" element={<Contacto />} />
        {isAuthenticated ? (
          <Route path="/mi-perfil" element={<OwnerProfile />} />
        ) : (
          <Route path="/mi-perfil" element={<Navigate to="/login" />} /> // Utiliza Navigate dentro de un Route
        )}
      </Routes>
    </div>
  );
}


export default App;
