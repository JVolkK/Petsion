import { useContext } from "react";
import { useNavigate } from "react-router-dom"; // Importa useNavigate
import { AppContext } from "../contexts/AppContext";

const useLogout = () => {
  const { setAuthenticated, setUsuarioLogeado } = useContext(AppContext);
  const navigate = useNavigate();

  const logout = () => {
    const usuarioLogeado = {
      id: null,
      rol: "guest",
    };
    setUsuarioLogeado(usuarioLogeado);
    localStorage.setItem("usuarioLogeado", JSON.stringify(usuarioLogeado));

    localStorage.removeItem("authToken");
    localStorage.removeItem("isAuthenticated");
    setAuthenticated(false);

    navigate("/login");
  };

  return logout;
};

export default useLogout;
