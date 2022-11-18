import React, { createContext, Profiler, useContext, useState } from "react";

const StateContext = createContext();
// const initialState = {
//   token: false,
// };

export const ContextProvider = ({ children }) => {
  const [token, setToken] = useState(false);

  return (
    <StateContext.Provider
      value={{
        setToken,
        token,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
