import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from '../contexts/AppContext';

export const useLogin = (username, password, userType, setError) => {
  const navigate = useNavigate();
  const { setAuthenticated } = useContext(AppContext);
  

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const loginUrl = 'https://api-petsion.onrender.com/user/login';
      
      const response = await axios.post(loginUrl, {
        username: username,
        password: password
      });

      // Si la solicitud es exitosa, guardamos el token en localStorage
      localStorage.setItem('authToken', response.data.token);
      console.log('Login exitoso:', response.data);

      // Actualizamos el estado de autenticación y redirigimos al usuario
      setAuthenticated(true);
      navigate('/'); // Redirigir a la página principal
    } catch (error) {
      console.error('Error en el login:', error.response.data.message);
      setError(error.response.data.message); // Mostramos el mensaje de error recibido del servidor
    }
  };

  return {
    handleLogin,
  };
};
