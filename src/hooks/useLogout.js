// useLogout.js
import { useContext } from 'react';
import { AppContext } from '../contexts/AppContext';

const useLogout = () => {
  const { setAuthenticated } = useContext(AppContext);

  const logout = () => {
    localStorage.removeItem('authToken');
    setAuthenticated(false);
    window.location.href = "/login"; // Redirect to login page after logout
  };

  return logout;
};

export default useLogout;
