import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import RegistrationSelect from "./RegistrationSelect";
import "../styles/App.css";
import RegistrationDuenio from "./RegistrationDuenio";
import BuscarCuidador from "./BuscarCuidador";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/registration-select" element={<RegistrationSelect />} />
        <Route path="/registration-duenio" element={<RegistrationDuenio />} />
        <Route path="/buscar-cuidador" element={<BuscarCuidador />} />
      </Routes>
    </div>
  );
}

export default App;