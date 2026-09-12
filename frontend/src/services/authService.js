import api from './api';

const TOKEN_KEY = 'lifebuild_token';

export const authService = {
  async login(credentials) {
    const data = await api.post('/auth/login', credentials);
    if (data.token) {
      localStorage.setItem(TOKEN_KEY, data.token);
    }
    return data;
  },

  async signup(userData) {
    const data = await api.post('/auth/signup', userData);
    if (data.token) {
      localStorage.setItem(TOKEN_KEY, data.token);
    }
    return data;
  },

  logout() {
    localStorage.removeItem(TOKEN_KEY);
  },

  getToken() {
    return localStorage.getItem(TOKEN_KEY);
  },

  async getCurrentUser() {
    return await api.get('/auth/me');
  },
};

export default authService;
