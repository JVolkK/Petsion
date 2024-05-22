import { useContext } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import { AppContext } from '../contexts/AppContext';

const useLogout = () => {
  const { setAuthenticated } = useContext(AppContext);
  const navigate = useNavigate(); // Inicializa useNavigate

  const logout = () => {
    localStorage.removeItem('authToken');
    setAuthenticated(false);
    navigate('/login'); // Usa navigate para redirigir a la página de login
  };

  return logout;
};

export default useLogout;
