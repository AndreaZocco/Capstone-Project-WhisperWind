import React, { createContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.get('http://localhost:5000/api/users/me', {
        headers: {
          Authorization: token
        }
      }).then(response => {
        setUser(response.data);
        setIsLoggedIn(true);
      }).catch(error => {
        console.error('Error fetching user data:', error);
        setIsLoggedIn(false);
      });
    }
  }, []);

  const login = async (token, showToast = true) => {
    localStorage.setItem('token', token);
    try {
      const response = await axios.get('http://localhost:5000/api/users/me', {
        headers: {
          Authorization: token
        }
      });
      setUser(response.data);
      setIsLoggedIn(true);
      if (showToast) {
        toast.success('Logged in successfully!');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const register = async (token, userData, showToast = true) => {
    localStorage.setItem('token', token);
    setUser(userData);
    setIsLoggedIn(true);
    if (showToast) {
      toast.success('Registered successfully!');
    }
  };

  const logout = async () => {
    const token = localStorage.getItem('token');
    try {
      await axios.post('http://localhost:5000/api/users/logout', {}, {
        headers: {
          Authorization: token
        }
      });
      localStorage.removeItem('token');
      setIsLoggedIn(false);
      setUser(null);
      toast.success('Logged out successfully!');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, register, logout, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};
