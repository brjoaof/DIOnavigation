import axios from 'axios';

const api = axios.create({
  // baseURL: 'http://localhost:3000', MACOS
  baseURL: 'http://146.134.208.244:3000',
});

export default api;
