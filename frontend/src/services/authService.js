/**
 * JWT Session & Authentication Service
 * Manages client-side token lifecycle, session storage, and authenticated HTTP requests.
 */

const TOKEN_KEY = 'token';
const USER_KEY = 'user';

export const authService = {
  /**
   * Retrieves the raw JWT token from storage
   * @returns {string | null}
   */
  getToken() {
    return localStorage.getItem(TOKEN_KEY);
  },

  /**
   * Retrieves cached user profile from storage
   * @returns {object | null}
   */
  getUser() {
    const cached = localStorage.getItem(USER_KEY);
    if (!cached) return null;
    try {
      return JSON.parse(cached);
    } catch {
      return null;
    }
  },

  /**
   * Sets new JWT session credentials
   * @param {string} token - JWT Bearer Token
   * @param {object} user - User profile object
   */
  setSession(token, user) {
    if (token) localStorage.setItem(TOKEN_KEY, token);
    if (user) localStorage.setItem(USER_KEY, JSON.stringify(user));
  },

  /**
   * Clears the current JWT session from localStorage
   */
  clearSession() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  },

  /**
   * Checks if user has an active session token
   * Validates token format and expiration if exp claim is present
   * @returns {boolean}
   */
  isAuthenticated() {
    const token = this.getToken();
    if (!token) return false;

    try {
      // Decode JWT payload (base64url)
      const parts = token.split('.');
      if (parts.length !== 3) return false;

      const payload = JSON.parse(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/')));
      if (payload.exp) {
        const isExpired = Date.now() >= payload.exp * 1000;
        if (isExpired) {
          this.clearSession();
          return false;
        }
      }
      return true;
    } catch {
      return true;
    }
  },

  /**
   * Constructs Authorization headers for authenticated requests
   * @param {object} customHeaders - Optional extra headers
   * @returns {object}
   */
  getAuthHeaders(customHeaders = {}) {
    const token = this.getToken();
    const headers = { ...customHeaders };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    return headers;
  },

  /**
   * Centralized authenticated fetch wrapper that handles automatic 401 token expiry
   * @param {string} url - Target URL
   * @param {object} options - Fetch options
   * @returns {Promise<Response>}
   */
  async fetchWithAuth(url, options = {}) {
    const headers = this.getAuthHeaders(options.headers || {});
    const res = await fetch(url, { ...options, headers });

    // If backend returns 401 Unauthorized (invalid/expired JWT)
    if (res.status === 401) {
      this.clearSession();
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }

    return res;
  },

  /**
   * Logs out user and redirects to login
   */
  logout() {
    this.clearSession();
    window.location.href = '/login';
  },
};

export default authService;
