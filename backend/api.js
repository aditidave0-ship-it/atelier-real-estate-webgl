// Backend-ready service layer for the H. Rishabraj website.
// Keeps the static prototype deployable today while making CRM/API wiring a small final step.

export const API_CONFIG = {
  baseUrl: '/api',
  timeoutMs: 10000
};

async function request(path, options = {}) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), API_CONFIG.timeoutMs);
  try {
    const response = await fetch(`${API_CONFIG.baseUrl}${path}`, {
      headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
      ...options,
      signal: controller.signal
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(data.error || `Request failed: ${response.status}`);
    return data;
  } finally {
    clearTimeout(timer);
  }
}

export const api = {
  projects: () => request('/projects'),
  project: id => request(`/projects?id=${encodeURIComponent(id)}`),
  enquiry: payload => request('/enquiry', { method: 'POST', body: JSON.stringify(payload) }),
  newsletter: email => request('/newsletter', { method: 'POST', body: JSON.stringify({ email }) })
};
