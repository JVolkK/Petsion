// AppContext.js
import React, { createContext, useState, useEffect } from "react";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [homeFormValue, setHomeFormValue] = useState("alojamiento");
  const [usuariosFiltrados, setUsuariosFiltrados] = useState({});
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [usuarioLogeado, setUsuarioLogeado] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setAuthenticated(true);
    }
  }, []);

  useEffect(() => {

    const usuarioLocal = JSON.parse(localStorage.getItem("usuarioLogeado"));
    if(usuarioLocal){
      setUsuarioLogeado(usuarioLocal);

    } else{
      setUsuarioLogeado({
        rol: "guess"
      })
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
