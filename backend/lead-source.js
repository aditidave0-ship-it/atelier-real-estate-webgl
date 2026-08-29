const KEYS = ['utm_source','utm_medium','utm_campaign','utm_content','utm_term','gclid','fbclid'];

export function captureLeadSource() {
  const params = new URLSearchParams(location.search);
  const source = {};
  for (const key of KEYS) {
    const value = params.get(key);
    if (value) source[key] = value.slice(0, 160);
  }
  if (Object.keys(source).length) {
    sessionStorage.setItem('hr-lead-source', JSON.stringify(source));
  }
  return source;
}

export function getLeadSource() {
  try { return JSON.parse(sessionStorage.getItem('hr-lead-source') || '{}'); }
  catch { return {}; }
}
