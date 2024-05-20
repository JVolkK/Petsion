import React, { createContext, useState } from "react";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [homeFormValue, setHomeFormValue] = useState("alojamiento");
  const [usuariosFiltrados, setUsuariosFiltrados] = useState({});
  const [isAuthenticated, setAuthenticated] = useState(false);

  return (
   
    <AppContext.Provider
      value={{
        homeFormValue,
        setHomeFormValue,
        usuariosFiltrados,
        setUsuariosFiltrados,
        setAuthenticated,
        isAuthenticated
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppProvider, AppContext };
