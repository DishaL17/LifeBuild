import api from './api';

export const userService = {
  async getUserProfile() {
    return await api.get('/user/profile');
  },

  async updateUserProfile(profileData) {
    return await api.put('/user/profile', profileData);
  },

  async getUserStats() {
    return await api.get('/user/stats');
  },

  async getInventory() {
    return await api.get('/user/inventory');
  },

  async getShopItems() {
    return await api.get('/shop/items');
  },

  async buyShopItem(itemId) {
    return await api.post(`/shop/buy/${itemId}`);
  },

  async getAchievements() {
    return await api.get('/user/achievements');
  },
};

export default userService;
