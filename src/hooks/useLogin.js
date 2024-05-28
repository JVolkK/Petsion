import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const useLogin = (username, password, userType, setError) => {
  const navigate = useNavigate();
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

      if (userType === "user") {
        localStorage.setItem(
          "usuarioLogeado",
          JSON.stringify({
            id: response.data.data.user._id,
            rol: response.data.data.user.role,
          })
        );
      } else if (userType === "anfitrion") {
        localStorage.setItem(
          "usuarioLogeado",
          JSON.stringify({
            id: response.data.data.anfitrion._id,
            rol: response.data.data.anfitrion.role,
          })
        );
      }

      // Si la solicitud es exitosa, guardamos el token en localStorage
      localStorage.setItem("authToken", response.data.data.token);
      localStorage.setItem("isAuthenticated", true);

      // Actualizamos el estado de autenticación y redirigimos al usuario
      // setAuthenticated(true);
      navigate("/"); // Redirigir a la página principal
    } catch (error) {
      const errorMessage = error.response
        ? error.response.data.message
        : error.message;
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
