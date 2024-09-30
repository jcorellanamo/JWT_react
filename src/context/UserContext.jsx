import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [email, setEmail] = useState(null);
  const [error, setError] = useState(null);

  // Método del login
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
        setError(data.message);
      }
    } catch (error) {
      setError('Error en la autenticación');
    }
  };

  // Método de registro
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
        setError(data.message);
      }
    } catch (error) {
      setError('Error en el registro');
    }
  };

  // Método de logout
  const logout = () => {
    setToken(null); // Elimina token
    setEmail(null); // Elimina mail
  };

  // Método para obtener el perfil del usuario autenticado
  const getProfile = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/me', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        return data; 
      } else {
        setError(data.message);
        return null;
      }
    } catch (error) {
      setError('Error al obtener el perfil del usuario');
      return null;
    }
  };

  return (
    <UserContext.Provider value={{ token, email, login, register, logout, getProfile, error }}>
      {children}
    </UserContext.Provider>
  );
};
