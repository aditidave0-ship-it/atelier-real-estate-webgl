const RATE_WINDOW_MS = 60_000;
const RATE_MAX = 5;
const hits = new Map();

function clean(value, max = 500) {
  return String(value ?? '').trim().replace(/[<>]/g, '').slice(0, max);
}

function validEmail(value) {
  return !value || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function allow(ip) {
  const now = Date.now();
  const current = hits.get(ip) || { start: now, count: 0 };
  if (now - current.start > RATE_WINDOW_MS) {
    hits.set(ip, { start: now, count: 1 });
    return true;
  }
  current.count += 1;
  hits.set(ip, current);
  return current.count <= RATE_MAX;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const ip = req.headers['x-forwarded-for']?.split(',')[0]?.trim() || 'unknown';
  if (!allow(ip)) return res.status(429).json({ error: 'Too many requests. Please try again shortly.' });

  const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
  const lead = {
    name: clean(body.name, 100),
    phone: clean(body.phone, 30),
    email: clean(body.email, 160).toLowerCase(),
    location: clean(body.location, 120),
    propertyType: clean(body.propertyType, 100),
    budget: clean(body.budget, 100),
    message: clean(body.message, 1000),
    project: clean(body.project, 120),
    source: 'website',
    createdAt: new Date().toISOString()
  };

  if (!lead.name || (!lead.phone && !lead.email)) {
    return res.status(400).json({ error: 'Name and either phone or email are required.' });
  }
  if (!validEmail(lead.email)) return res.status(400).json({ error: 'Please enter a valid email address.' });

  // Integration point: forward `lead` to the approved CRM/email provider.
  // No personal lead data is logged to server output.
  return res.status(201).json({ ok: true, message: 'Thank you. Your enquiry has been received.' });
}
