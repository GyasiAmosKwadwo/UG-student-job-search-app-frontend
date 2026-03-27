/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect } from 'react';

// Create Context
const AuthContext = createContext();

// Custom hook to use the auth context easily
export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true); // helps prevent redirecting before checking storage

  useEffect(() => {
    // On first load, check if there's a token/role in localStorage
    const storedAuth = localStorage.getItem('isAuthenticated');
    const storedRole = localStorage.getItem('userRole');

    if (storedAuth === 'true' && storedRole) {
      setIsAuthenticated(true);
      setUserRole(storedRole);
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    // Replace with the ACTUAL endpoint the backend dev gives you
    const LOGIN_URL = 'https://ug-student-job.onrender.com/api/login/';

    const response = await fetch(LOGIN_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      // If they return an error message, try to grab it
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.detail || errorData?.non_field_errors?.[0] || 'Invalid email or password');
    }

    const data = await response.json();
    
    // Expected from Django: access token, and maybe user profile data containing the role
    const role = data.role || (email.includes('employer') ? 'employer' : 'student'); // Fallback if backend doesn't send role
    const token = data.access || data.token; // Fallback if it's SimpleJWT or TokenAuth

    setIsAuthenticated(true);
    setUserRole(role);
    
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('userRole', role);
    if (token) localStorage.setItem('token', token);

    return role;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserRole(null);
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userRole');
    localStorage.removeItem('token');
  };

  const value = {
    isAuthenticated,
    userRole,
    login,
    logout,
  };

  if (loading) return null; // Or a full-page spinner

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
