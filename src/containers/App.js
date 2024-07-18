import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import RegistrationSelect from "./RegistrationSelect";
import RegistrationDuenio from "./RegistrationDuenio";
import Servicios from "./Servicios";
import BuscarCuidador from "./BuscarCuidador";
import RegistrationAnfitrion from "./RegistrationAnfitrion";
import Contacto from "./Contacto";
import LoginPage from "./Login";
import PerfilAnfitrion from "./PerfilAnfitrion";
import ValidateEmail from "./ValidateEmail";
import "../styles/leaflet.css";
import EmailValidated from "./EmailValidated";
import PerfilDuenio from "./PerfilDuenio";
import ReservarCuidador from "./ReservarCuidador";
import ProtectedRoute from "../components/ProtectedRoute";
import { AppProvider } from "../contexts/AppContext";
import MisReservasAnfitrion from "./MisReservasAnfitrion";
import MisReservasDuenio from "./MisReservasDuenio";

function App() {
  return (
    <AppProvider>
      <div className="App">
        <Routes>
          {/* Rutas para Guest */}
          <Route element={<ProtectedRoute rolDeseado="guest" />}>
            <Route
              path="/registration-select"
              element={<RegistrationSelect />}
            />
            <Route
              path="/registration-duenio"
              element={<RegistrationDuenio />}
            />
            <Route
              path="/registration-anfitrion"
              element={<RegistrationAnfitrion />}
            />
            <Route path="/validate-email" element={<ValidateEmail />} />
            <Route path="/email-validated" element={<EmailValidated />} />
            <Route path="/login" element={<LoginPage />} />
          </Route>

          {/* Rutas para User */}
          <Route element={<ProtectedRoute rolDeseado="user" />}>
            <Route path="/perfil-duenio" element={<PerfilDuenio />} />

            <Route
              path="reservar-cuidador/:cuidadorId"
              element={<ReservarCuidador />}
            />
            <Route path="/reservas-duenio" element={<MisReservasDuenio />} />
          </Route>

          {/* Rutas para Anfitrion */}
          <Route element={<ProtectedRoute rolDeseado="anfitrion" />}>
            <Route path="/mi-perfil" element={<PerfilAnfitrion />} />
            <Route
              path="/reservas-anfitrion"
              element={<MisReservasAnfitrion />}
            />
          </Route>

          {/* Rutas para múltiples roles: guest y user */}
          <Route element={<ProtectedRoute rolDeseado={["guest", "user"]} />}>
            <Route path="/buscar-cuidador" element={<BuscarCuidador />} />
          </Route>

          {/* Rutas compartidas entre anfitrion y user */}
          <Route
            element={<ProtectedRoute rolDeseado={["anfitrion", "user"]} />}
          ></Route>
          {/* Rutas compartidas entre anfitrion, user y guest */}
          <Route
            element={
              <ProtectedRoute rolDeseado={["anfitrion", "user", "guest"]} />
            }
          >
            <Route path="/" element={<Home />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/servicios-select" element={<Servicios />} />
          </Route>
        </Routes>
      </div>
    </AppProvider>
  );
}

export default App;
