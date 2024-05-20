import React, { createContext, useState } from "react";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [homeFormValue, setHomeFormValue] = useState("alojamiento");

  const [isAuthenticated, setAuthenticated] = useState(false);

  return (
    <AppContext.Provider value={{ homeFormValue, setHomeFormValue, isAuthenticated, setAuthenticated }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppProvider, AppContext };
