import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import RegistrationSelect from "./RegistrationSelect";
import "../styles/App.css";
import RegistrationDuenio from "./RegistrationDuenio";
import Servicios from "./Servicios";
import BuscarCuidador from "./BuscarCuidador";
<<<<<<< HEAD
import RegistrationAnfitrion from "./RegistrationAnfitrion";
import Contacto from "./Contacto";
=======
import LoginPage from "./Login"; // Mantener esta línea
import RegistrationAnfitrion from "./RegistrationAnfitrion"; // Mantener esta línea
>>>>>>> 53a5c83dc5ed13f800d056e5c4a837f8a75b9fcd

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
<<<<<<< HEAD
        />
        <Route path="/Contacto" element={<Contacto />} />
=======
        /> {/* Mantener esta línea */}
>>>>>>> 53a5c83dc5ed13f800d056e5c4a837f8a75b9fcd
      </Routes>
    </div>
  );
}

export default App;
