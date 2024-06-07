import React, { createContext, useState, useEffect } from "react";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [homeFormValue, setHomeFormValue] = useState("alojamiento");
  const [usuariosFiltrados, setUsuariosFiltrados] = useState({});
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [usuarioLogeado, setUsuarioLogeado] = useState(null);

  useEffect(() => {
    const savedUsuario = localStorage.getItem("usuarioLogeado");
    if (savedUsuario) {
      setUsuarioLogeado(JSON.parse(savedUsuario));
    } else {
      const usuarioLogeado = {
        id: null,
        rol: "guest",
      };
      setUsuarioLogeado(usuarioLogeado);
      localStorage.setItem("usuarioLogeado", JSON.stringify(usuarioLogeado));
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setAuthenticated(true);
    }
  }, []);

  return (
    <AppContext.Provider
      value={{
        homeFormValue,
        setHomeFormValue,
        usuariosFiltrados,
        setUsuariosFiltrados,
        setAuthenticated,
        isAuthenticated,
        usuarioLogeado,
        setUsuarioLogeado,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppProvider, AppContext };
