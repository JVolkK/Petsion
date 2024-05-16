import React, { createContext, useState } from "react";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [homeFormValue, setHomeFormValue] = useState("alojamiento");

  const [usuariosFiltrados, setUsuariosFiltrados] = useState({});

  return (
    <AppContext.Provider
      value={{
        homeFormValue,
        setHomeFormValue,
        usuariosFiltrados,
        setUsuariosFiltrados,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppProvider, AppContext };
