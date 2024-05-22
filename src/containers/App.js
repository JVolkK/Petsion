
  import { Route, Routes } from "react-router-dom";
  import Home from "./Home";
  import RegistrationSelect from "./RegistrationSelect";
  import RegistrationDuenio from "./RegistrationDuenio";
  import Servicios from "./Servicios";
  import BuscarCuidador from "./BuscarCuidador";
  import RegistrationAnfitrion from "./RegistrationAnfitrion";
  import Contacto from "./Contacto";
  import LoginPage from "./Login";
  import { AppProvider } from "../contexts/AppContext";
  import OwnerProfile from './OwnerProfile';
  import "../styles/leaflet.css";


  function App() {
    
    return (
      <AppProvider>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/registration-select" element={<RegistrationSelect />} />
            <Route path="/registration-duenio" element={<RegistrationDuenio />} />
            <Route path="/servicios-select" element={<Servicios />} />
            <Route path="/buscar-cuidador" element={<BuscarCuidador />} />
            <Route path="/login" element={<LoginPage/>} />
            <Route path="/registration-anfitrion" element={<RegistrationAnfitrion />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/mi-perfil" element={<OwnerProfile />} /> {/* Nueva ruta para el perfil del usuario */}
          </Routes>
        </div>  
      </AppProvider>
    );
  }

  export default App;
