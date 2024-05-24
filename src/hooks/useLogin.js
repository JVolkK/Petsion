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
      let loginUrl = '';

      // Seleccionar la URL de inicio de sesión según el userType
      if (userType === 'user') {
        loginUrl = 'https://api-petsion.onrender.com/user/login';
      } else if (userType === 'anfitrion') {
        loginUrl = 'https://api-petsion.onrender.com/anfitrion/login';
      } else {
        // Manejar el caso en que el userType no sea válido
        throw new Error('Tipo de usuario no válido');
      }

      console.log({ username, password, userType });

      const response = await axios.post(loginUrl, {
        username: username,
        password: password,
      });

      // Si la solicitud es exitosa, guardamos el token en localStorage
      localStorage.setItem('authToken', response.data.data.token);

      // Actualizamos el estado de autenticación y redirigimos al usuario
      setAuthenticated(true);
      navigate('/'); // Redirigir a la página principal
    } catch (error) {
      console.error('Error en el login:', error.response ? error.response.data.message : error.message);
      setError(error.response ? error.response.data.message : error.message); // Mostramos el mensaje de error recibido del servidor
    }
  };

  return {
    handleLogin,
  };
};
