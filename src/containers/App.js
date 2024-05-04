import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import RegistrationSelect from "./RegistrationSelect";
import "../styles/App.css";
import RegistrationDuenio from "./RegistrationDuenio";
import Servicios from "./Servicios";
import BuscarCuidador from "./BuscarCuidador";
import LoginPage from "./Login"; // Mantener esta línea
import RegistrationAnfitrion from "./RegistrationAnfitrion"; // Mantener esta línea

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/registration-select" element={<RegistrationSelect />} />
        <Route path="/registration-duenio" element={<RegistrationDuenio />} />
        <Route path="/servicios-select" element={<Servicios />} />
        <Route path="/buscar-cuidador" element={<BuscarCuidador />} />
        <Route path="/login" element={<LoginPage />} /> {/* Mantener esta línea */}
        <Route
          path="/registration-anfitrion"
          element={<RegistrationAnfitrion />}
        /> {/* Mantener esta línea */}
      </Routes>
    </div>
  );
}

export default App;
