import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001/v1',
});

export default api;