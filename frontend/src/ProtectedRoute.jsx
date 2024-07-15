import React from 'react';
import { Route, Navigate, Routes } from 'react-router-dom';
import { useAuth } from './context/AuthProvider';

const ProtectedRoute = ({ component: Component, adminOnly = false, ...rest }) => {
  const [authUser] = useAuth();

  return (
    <Routes>
        <Route
      {...rest}
      render={(props) => 
        authUser ? (
          !adminOnly || (adminOnly && authUser.role === 'admin') ? (
            <Admin {...props} />
          ) : (
            <Navigate to="/" />
          )
        ) : (
          <Navigate to="/signup" />
        )
      }
    />
    </Routes>
  );
};

export default ProtectedRoute;
