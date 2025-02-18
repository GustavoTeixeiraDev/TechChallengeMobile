import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const api = axios.create({
  baseURL: 'http://192.168.0.32:3000/api',
});

api.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem('token');
      console.log('Token enviado na requisição:', token);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('Erro ao recuperar token:', error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;