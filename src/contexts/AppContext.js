import React, { createContext, useState } from "react";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [homeFormValue, setHomeFormValue] = useState("alojamiento");

  return (
    <AppContext.Provider value={{ homeFormValue, setHomeFormValue }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppProvider, AppContext };
