/**
 * Base API client service for LifeBuild
 */

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

async function request(endpoint, options = {}) {
  const token = localStorage.getItem('lifebuild_token');

  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const config = {
    ...options,
    headers,
  };

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, config);

    // If unauthorized, optional hook for clearing session
    if (response.status === 401) {
      localStorage.removeItem('lifebuild_token');
    }

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(data.message || `Request failed with status ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error(`API Error [${endpoint}]:`, error);
    throw error;
  }
}

export const api = {
  get: (endpoint, headers) => request(endpoint, { method: 'GET', headers }),
  post: (endpoint, body, headers) =>
    request(endpoint, { method: 'POST', body: JSON.stringify(body), headers }),
  put: (endpoint, body, headers) =>
    request(endpoint, { method: 'PUT', body: JSON.stringify(body), headers }),
  delete: (endpoint, headers) => request(endpoint, { method: 'DELETE', headers }),
};

export default api;
