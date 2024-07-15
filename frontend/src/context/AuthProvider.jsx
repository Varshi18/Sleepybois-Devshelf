import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const currentUser = localStorage.getItem("Users");
  const [authUser, setAuthUser] = useState(
    currentUser ? JSON.parse(currentUser) : null 
  );

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await axios.get("http://localhost:4001/user/user", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const userData = { ...response.data, role: response.data.role };
          setAuthUser(userData);
          localStorage.setItem("Users", JSON.stringify(userData));
        } catch (error) {
          console.error("Error fetching user data", error);
          setAuthUser(null);
          localStorage.removeItem("Users");
        }
      } else {
        setAuthUser(null);
        localStorage.removeItem("Users");
      }
    };
  
    if (!authUser) {
      fetchUser();
    }
  }, [authUser]);
  
  return (
    <AuthContext.Provider value={[authUser, setAuthUser]}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
