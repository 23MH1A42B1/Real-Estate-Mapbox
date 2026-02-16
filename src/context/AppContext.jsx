import React, { createContext, useState } from "react";

export const AppContext = createContext();

export function AppProvider({ children }) {
  const [selectedProperty, setSelectedProperty] = useState(null);

  return (
    <AppContext.Provider
      value={{
        selectedProperty,
        setSelectedProperty
      }}
    >
      {children}
    </AppContext.Provider>
  );
}