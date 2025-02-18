import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userType, setUserType] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    const token = await AsyncStorage.getItem('token');
    const storedUserType = await AsyncStorage.getItem('userType');
    if (token && storedUserType) {
      setUserType(storedUserType);
      try {
        const response = await api.get('/auth/me');
        setUser(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    setLoading(false);
  };

  const login = async (credentials) => {
    try {
      const response = await api.post('/auth/login', credentials);
      await AsyncStorage.setItem('token', response.data.token);
      await AsyncStorage.setItem('userType', response.data.userType);
      setUser(response.data.user);
      setUserType(response.data.userType);
    } catch (error) {
      console.error(error);
      alert('Erro ao fazer login. Verifique suas credenciais.');
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('userType');
    setUser(null);
    setUserType(null);
  };

  return (
    <AuthContext.Provider value={{ user, userType, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;