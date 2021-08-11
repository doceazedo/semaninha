import axios from 'axios';

const api = axios.create({
  baseURL: 'https://musicwrap-api.herokuapp.com/v1',
});

export default api;