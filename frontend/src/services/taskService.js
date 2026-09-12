import api from './api';

export const taskService = {
  async getTasks(params = {}) {
    const query = new URLSearchParams(params).toString();
    const endpoint = query ? `/tasks?${query}` : '/tasks';
    return await api.get(endpoint);
  },

  async getTaskById(taskId) {
    return await api.get(`/tasks/${taskId}`);
  },

  async createTask(taskData) {
    return await api.post('/tasks', taskData);
  },

  async updateTask(taskId, updates) {
    return await api.put(`/tasks/${taskId}`, updates);
  },

  async completeTask(taskId) {
    return await api.post(`/tasks/${taskId}/complete`);
  },

  async deleteTask(taskId) {
    return await api.delete(`/tasks/${taskId}`);
  },
};

export default taskService;
