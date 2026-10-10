const isLocal = typeof window !== 'undefined' && window.location.hostname === 'localhost';
const API_BASE = 'http://localhost:5000/api';

// Helper for fetch with timeout
async function fetchWithTimeout(resource, options = {}) {
  const { timeout = 800 } = options;
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  try {
    const response = await fetch(resource, {
      ...options,
      signal: controller.signal
    });
    clearTimeout(id);
    return response;
  } catch (error) {
    clearTimeout(id);
    throw error;
  }
}

export const apiService = {
  // Check backend health
  async checkHealth() {
    if (!isLocal) return null;
    try {
      const res = await fetchWithTimeout(`${API_BASE}/health`, { timeout: 600 });
      return await res.json();
    } catch (e) {
      console.warn('Backend server offline, falling back to local state:', e);
      return null;
    }
  },

  // Get Briefs
  async getBriefs() {
    if (!isLocal) return null;
    try {
      const res = await fetchWithTimeout(`${API_BASE}/briefs`, { timeout: 600 });
      if (!res.ok) throw new Error('Failed to fetch briefs');
      return await res.json();
    } catch (e) {
      console.warn('Backend endpoint error, using local fallback:', e);
      return null;
    }
  },

  // Post Brief
  async createBrief(briefData) {
    if (!isLocal) return { success: true, brief: briefData };
    try {
      const res = await fetchWithTimeout(`${API_BASE}/briefs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(briefData),
        timeout: 800
      });
      return await res.json();
    } catch (e) {
      console.warn('Backend offline, saved locally:', e);
      return { success: true, brief: briefData };
    }
  },

  // Get Messages
  async getMessages() {
    if (!isLocal) return null;
    try {
      const res = await fetchWithTimeout(`${API_BASE}/messages`, { timeout: 600 });
      if (!res.ok) throw new Error('Failed to fetch messages');
      return await res.json();
    } catch (e) {
      console.warn('Backend endpoint error, using local fallback:', e);
      return null;
    }
  },

  // Post Selection Notice Message
  async sendMessage(msgData) {
    if (!isLocal) return { success: true, message: msgData };
    try {
      const res = await fetchWithTimeout(`${API_BASE}/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(msgData),
        timeout: 800
      });
      return await res.json();
    } catch (e) {
      console.warn('Backend offline, saved locally:', e);
      return { success: true, message: msgData };
    }
  },

  // Login / Signup Auth API
  async loginUser(userData) {
    if (!isLocal) return { success: true, user: userData };
    try {
      const res = await fetchWithTimeout(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
        timeout: 800
      });
      return await res.json();
    } catch (e) {
      console.warn('Backend offline, using client session:', e);
      return { success: true, user: userData };
    }
  }
};
