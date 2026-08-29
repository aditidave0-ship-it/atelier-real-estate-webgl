const WINDOW_MS = 60_000;
const MAX_HITS = 5;
const hits = new Map();

function clean(value, max = 500) {
  return String(value ?? '').trim().replace(/[<>]/g, '').slice(0, max);
}

function validEmail(value) {
  return !value || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function allowed(ip) {
  const now = Date.now();
  const current = hits.get(ip) || { start: now, count: 0 };
  if (now - current.start > WINDOW_MS) {
    hits.set(ip, { start: now, count: 1 });
    return true;
  }
  current.count += 1;
  hits.set(ip, current);
  return current.count <= MAX_HITS;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const ip = req.headers['x-forwarded-for']?.split(',')[0]?.trim() || 'unknown';
  if (!allowed(ip)) return res.status(429).json({ error: 'Too many requests. Please try again shortly.' });

  let body = req.body || {};
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch { return res.status(400).json({ error: 'Invalid request body.' }); }
  }

  const lead = {
    name: clean(body.name, 100),
    phone: clean(body.phone, 30),
    email: clean(body.email, 160).toLowerCase(),
    location: clean(body.location, 120),
    propertyType: clean(body.propertyType, 100),
    budget: clean(body.budget, 100),
    message: clean(body.message, 1000),
    project: clean(body.project, 120),
    source: clean(body.source || 'website', 80),
    campaign: clean(body.campaign, 120),
    createdAt: new Date().toISOString()
  };

  if (!lead.name || (!lead.phone && !lead.email)) {
    return res.status(400).json({ error: 'Name and either phone or email are required.' });
  }
  if (!validEmail(lead.email)) return res.status(400).json({ error: 'Please enter a valid email address.' });

  // Production integration point:
  // POST lead to the selected CRM/email platform with server-side credentials.
  // Never expose CRM secrets in browser JavaScript and never log lead PII here.
  return res.status(201).json({ ok: true, message: 'Thank you. Your enquiry has been received.' });
}
