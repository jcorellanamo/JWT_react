import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [email, setEmail] = useState(null);
  const [error, setError] = useState(null);

  // Método de login
  const login = async (email, password) => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setToken(data.token);
        setEmail(data.email);
        setError(null);
      } else {
        setError(data.message || 'Error al iniciar sesión');
      }
    } catch (error) {
      setError('Error de red o en el servidor al intentar iniciar sesión.');
    }
  };

  // Método de registro (sin cambios)
  const register = async (email, password) => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setToken(data.token);
        setEmail(data.email);
        setError(null);
      } else {
        setError(data.message || 'Error al registrarse');
      }
    } catch (error) {
      setError('Error de red o en el servidor al intentar registrarse.');
    }
  };

  const logout = () => {
    setToken(null);
    setEmail(null);
  };

  return (
    <UserContext.Provider value={{ token, email, error, login, register, logout }}>
      {children}
    </UserContext.Provider>
  );
};
