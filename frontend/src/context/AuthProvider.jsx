import React, { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

export default function Authprovider({ children }) {
  const currentUser = localStorage.getItem("Users");
  const [authUser, setAuthUser] = useState(
    currentUser ? JSON.parse(currentUser) : undefined
  );
  return (
    <AuthContext.Provider value={[ authUser, setAuthUser ]}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
