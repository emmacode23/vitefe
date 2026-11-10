const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api/v1';
const TOKEN_KEY = 'vitefe_token';

export function clearSession() {
  localStorage.removeItem(TOKEN_KEY);
}

export function getSessionToken() {
  return localStorage.getItem(TOKEN_KEY);
}

async function request(path, { method = 'GET', body, authenticated = false, saveSession = true } = {}) {
  const headers = { 'Content-Type': 'application/json' };
  if (authenticated) {
    const token = getSessionToken();
    if (token) headers.Authorization = `Bearer ${token}`;
  }

  let response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      method,
      headers,
      body: body === undefined ? undefined : JSON.stringify(body),
    });
  } catch {
    throw new Error('Impossible de joindre le serveur. Vérifiez votre connexion.');
  }

  const result = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(result.error || 'La requête a échoué.');
  if (result.token && saveSession) localStorage.setItem(TOKEN_KEY, result.token);
  return result;
}

export const api = {
  register: (data) => request('/auth/register', { method: 'POST', body: data }),
  login: (data) => request('/auth/login', { method: 'POST', body: data }),
  requestOtp: (phone) => request('/auth/otp/request', { method: 'POST', body: { phone } }),
  verifyOtp: (phone, code, saveSession = true) => request('/auth/otp/verify', {
    method: 'POST', body: { phone, code }, saveSession,
  }),
  currentUser: () => request('/auth/me', { authenticated: true }),
  createRequest: (serviceId) => request('/requests', { method: 'POST', body: { serviceId }, authenticated: true }),
  createEmergency: (coordinates = {}) => request('/emergencies', { method: 'POST', body: coordinates, authenticated: true }),
};