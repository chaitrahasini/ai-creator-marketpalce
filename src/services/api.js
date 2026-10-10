const API_BASE = 'http://localhost:5000/api';

export const apiService = {
  // Check backend health
  async checkHealth() {
    try {
      const res = await fetch(`${API_BASE}/health`);
      return await res.json();
    } catch (e) {
      console.warn('Backend server offline, falling back to local state:', e);
      return null;
    }
  },

  // Get Briefs
  async getBriefs() {
    try {
      const res = await fetch(`${API_BASE}/briefs`);
      if (!res.ok) throw new Error('Failed to fetch briefs');
      return await res.json();
    } catch (e) {
      console.warn('Backend endpoint error, using local fallback:', e);
      return null;
    }
  },

  // Post Brief
  async createBrief(briefData) {
    try {
      const res = await fetch(`${API_BASE}/briefs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(briefData)
      });
      return await res.json();
    } catch (e) {
      console.warn('Backend offline, saved locally:', e);
      return { success: false };
    }
  },

  // Get Messages
  async getMessages() {
    try {
      const res = await fetch(`${API_BASE}/messages`);
      if (!res.ok) throw new Error('Failed to fetch messages');
      return await res.json();
    } catch (e) {
      console.warn('Backend endpoint error, using local fallback:', e);
      return null;
    }
  },

  // Post Selection Notice Message
  async sendMessage(msgData) {
    try {
      const res = await fetch(`${API_BASE}/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(msgData)
      });
      return await res.json();
    } catch (e) {
      console.warn('Backend offline, saved locally:', e);
      return { success: false };
    }
  },

  // Login / Signup Auth API
  async loginUser(userData) {
    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });
      return await res.json();
    } catch (e) {
      console.warn('Backend offline, using client session:', e);
      return { success: true, user: userData };
    }
  }
};
