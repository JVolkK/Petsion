import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";

export const useLogin = (username, password, userType, setError) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const usernameRef = useRef(null);
  const passwordRef = useRef(null);

  const handleLogin = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      let loginUrl = "";

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

      // Redirigir a la página principal
      navigate("/");
    } catch (error) {
      // Manejar el error para mostrar los bordes rojos y limpiar los campos
      const errorMessage = "Usuario o Contraseña incorrectos 😔";

      // Establecer el mensaje de error
      setError(errorMessage);

      // Establecer bordes rojos en los campos de usuario y contraseña
      if (usernameRef.current) {
        usernameRef.current.style.border = "1px solid red";
        usernameRef.current.value = "";
      }

      if (passwordRef.current) {
        passwordRef.current.style.border = "1px solid red";
        passwordRef.current.value = "";
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    handleLogin,
    loading,
    usernameRef,
    passwordRef,
  };
};
