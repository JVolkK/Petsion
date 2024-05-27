import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";
import { useState } from "react";

export const useLogin = (username, password, userType, setError) => {
  const navigate = useNavigate();
  const { setAuthenticated, setUsuarioLogeado } = useContext(AppContext);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      let loginUrl = "";

      // Seleccionar la URL de inicio de sesión según el userType
      if (userType === "user") {
        loginUrl = "https://api-petsion.onrender.com/user/login";
      } else if (userType === "anfitrion") {
        loginUrl = "https://api-petsion.onrender.com/anfitrion/login";
      } else {
        // Manejar el caso en que el userType no sea válido
        throw new Error("Tipo de usuario no válido");
      }

      const response = await axios.post(loginUrl, {
        username: username,
        password: password,
      });

      if (userType === "user")
        setUsuarioLogeado({
          id: response.data.data.user._id,
          rol: response.data.data.user.role,
        });
      else {
        setUsuarioLogeado({
          id: response.data.data.anfitrion._id,
          rol: response.data.data.anfitrion.role,
        });
      }

      // Si la solicitud es exitosa, guardamos el token en localStorage
      localStorage.setItem("authToken", response.data.data.token);

      // Actualizamos el estado de autenticación y redirigimos al usuario
      setAuthenticated(true);
      navigate("/"); // Redirigir a la página principal
    } catch (error) {
      const errorMessage = error.response
        ? error.response.data.message
        : error.message;
      console.error("Error en el login:", errorMessage);
      setError(errorMessage); // Mostramos el mensaje de error recibido del servidor o el mensaje de error general
    } finally {
      setLoading(false);
    }
  };

  return {
    handleLogin,
    loading,
  };
};
